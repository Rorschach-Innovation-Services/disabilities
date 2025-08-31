import { Questionnaire } from '../models';
import type { AssessmentAttributes } from '../models/assessment.model';

export const SECTORS = ['Prepare', 'Integrate', 'Value-Add', 'Optimise', 'Transfer'] as const;
export const SUBS = ['Space', 'Person', 'Culture'] as const;

const AXES_5x3: string[] = (() => {
  const axes: string[] = [];
  SECTORS.forEach((s) => SUBS.forEach((sub) => axes.push(`${s} - ${sub}`)));
  return axes;
})();

export const getSpiderAxes = () => AXES_5x3.slice();


const DEFAULT_MAX_SCORE = 5;

export const normalizeCategoryName = (name: string): string => {
  if (!name) return '';
  const n = name.trim().toLowerCase();
  if (n.includes('prep')) return 'Prepare';
  if (n.includes('integrat')) return 'Integrate';
  if (n.includes('value')) return 'Value-Add';
  if (n.includes('optim')) return 'Optimise';
  if (n.includes('trans')) return 'Transfer';
  return name;
};

export const getQuestionColor = (label: string) => {
  const sectorPart = (label || '').split(' - ')[0].trim();
  const normalized = normalizeCategoryName(sectorPart).toLowerCase();
  const map: Record<string, string> = {
    'prepare': '#0074D9',
    'integrate': '#2ECC40',
    'value-add': '#FFDC00',
    'optimise': '#FF851B',
    'transfer': '#B10DC9',
  };
  return { color: map[normalized] ?? '#ddd' };
};

const avg = (list: number[]) => {
  if (!list || list.length === 0) return 0;
  const s = list.reduce((a, b) => a + (Number(b) || 0), 0);
  return parseFloat((s / list.length).toFixed(1));
};

const sum = (list: number[]) => list.reduce((a, b) => a + (Number(b) || 0), 0);

const fetchQuestionnaireDefs = async () => {
  const res = await Questionnaire.query({ _en: 'questionnaire' }, { index: 'gsIndex' });
  return res;
};

export type SpiderSectorSummary = {
  sector: (typeof SECTORS)[number];
  raw: number;   // sector average across its 3 spokes (0..maxScore)
  pct: number;   // normalized sector average (0..100)
  count: number; // total responses summed across its 3 spokes
};

export type SpiderSeries = {
  axes: string[];   // 15 axes in fixed order
  raw: number[];    // per-axis averages (0..maxScore)
  pct: number[];    // per-axis % (0..100)
  counts: number[]; // per-axis response counts
  sectorSummary: SpiderSectorSummary[]; // 5 items, one per sector
  meta: {
    maxScore: number;
    ordersUsed: number[];
    generatedAt: string;
  };
};

export const getSpiderSeries = async (
  assessments: AssessmentAttributes[],
  options?: { questionnaireOrders?: number[]; maxScore?: number },
): Promise<SpiderSeries> => {
  const defs = await fetchQuestionnaireDefs();
  const orders = options?.questionnaireOrders ?? [3];
  const qIds: string[] = (defs?.items || [])
    .filter((q: any) => orders.includes(q.order) && !q.deleted)
    .map((q: any) => q.id);

  const relevant = (assessments || []).filter((a) => qIds.includes(a.questionnaireId));

  // Group: sector -> sub -> values
  const grouped: Record<string, Record<string, number[]>> = {};
  relevant.forEach((a) => {
    (a.questionnaire || []).forEach((q) => {
      const sector = normalizeCategoryName(q.category || '');
      const sub = (q.label || '').trim();
      if (!sector || !sub) return;
      if (!grouped[sector]) grouped[sector] = {};
      if (!grouped[sector][sub]) grouped[sector][sub] = [];
      grouped[sector][sub].push(Number(q.response) || 0);
    });
  });

  const axes = getSpiderAxes();
  const raw: number[] = [];
  const pct: number[] = [];
  const counts: number[] = [];
  const maxScore = options?.maxScore ?? DEFAULT_MAX_SCORE;

  // Per-sector accumulation for summary
  const sectorAccum: Record<string, { rawSum: number; spokeCount: number; respCount: number }> = {};

  axes.forEach((axis) => {
    const [sector, sub] = axis.split(' - ');
    const values = grouped[sector]?.[sub] || [];
    const a = avg(values);
    raw.push(a);
    pct.push(parseFloat(((a / maxScore) * 100).toFixed(1)));
    counts.push(values.length);

    if (!sectorAccum[sector]) sectorAccum[sector] = { rawSum: 0, spokeCount: 0, respCount: 0 };
    sectorAccum[sector].rawSum += a;
    sectorAccum[sector].spokeCount += 1; // 3 spokes per sector
    sectorAccum[sector].respCount += values.length;
  });

  const sectorSummary: SpiderSectorSummary[] = SECTORS.map((sector) => {
    const acc = sectorAccum[sector] || { rawSum: 0, spokeCount: 0, respCount: 0 };
    const sectorRaw = acc.spokeCount > 0 ? parseFloat((acc.rawSum / acc.spokeCount).toFixed(2)) : 0;
    const sectorPct = parseFloat(((sectorRaw / maxScore) * 100).toFixed(1));
    return { sector, raw: sectorRaw, pct: sectorPct, count: acc.respCount };
  });

  return {
    axes,
    raw,
    pct,
    counts,
    sectorSummary,
    meta: {
      maxScore,
      ordersUsed: orders,
      generatedAt: new Date().toISOString(),
    },
  };
};


export default {
  SECTORS,
  SUBS,
  getSpiderAxes,
  getSpiderSeries,
  getQuestionColor,
};
