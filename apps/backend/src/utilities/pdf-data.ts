import { Score } from '../models/assessment.model';
import { Employee } from '../models/employee.model';
import { format, isAfter, isBefore } from 'date-fns';

export type PDFData = {
  date: string;
  companyName: string;
  participationUptake: number;
  genderDistribution: {
    men: number;
    women: number;
    nonBinary: number;
    notSaid: number;
  };
  screeningPeriod: {
    start: string;
    end: string;
  };
  ageDistribution: {
    average: number;
    '20-29': number;
    '30-39': number;
    '40-49': number;
    '50-59': number;
    '60-69': number;
  };
  sleepHealthScore: {
    score: number;
    poor: {
      all: number;
      men: number;
      women: number;
    };
    fair: {
      all: number;
      men: number;
      women: number;
    };
    excellent: {
      all: number;
      men: number;
      women: number;
    };
    textValue: string;
  };
  sleepDuration: {
    average: number;
    data: {
      '5h': number;
      '6h': number;
      '7h': number;
      '8h': number;
      '9h': number;
      '10h': number;
      '11h': number;
    };
    women: { lessThan7: number; between7and9: number; moreThan9: number };
    men: { lessThan7: number; between7and9: number; moreThan9: number };
  };
  sleepEfficiency: {
    poorSleepEfficiency: number;
    all: number;
    men: number;
    women: number;
  };
  perceivedSleepQuality: {
    average: number;
    women: number;
    men: number;
  };
  daytimeFunction: {
    average: number;
    women: number;
    men: number;
  };
  sleepDisorder: {
    yes: number;
    no: number;
    mostCommon: string;
    others: any[];
  };
  sleepManagement: {
    allEmployees: { wellManaged: number; notManaged: number };
    women: { wellManaged: number; notManaged: number };
    men: { wellManaged: number; notManaged: number };
  };
  sleepMedication: {
    yes: number;
    no: number;
    allEmployess: {
      usingMedication: number;
      withSleepDisorder: number;
      withoutSleepDisorder: number;
    };
    women: {
      usingMedication: number;
      withSleepDisorder: number;
      withoutSleepDisorder: number;
    };
    men: {
      usingMedication: number;
      withSleepDisorder: number;
      withoutSleepDisorder: number;
    };
  };
  summary: {
    allCount: number;
    womenCount: number;
    menCount: number;
    all: {
      poorSleepHealth: number;
      shortSleep: number;
      poorSleepEfficiency: number;
      lowPerceivedSleepQuality: number;
      impactOnDaytimeFunction: number;
      notManagedSleepDisorders: number;
      useOfSleepMedication: number;
    };
    women: {
      poorSleepHealth: number;
      shortSleep: number;
      poorSleepEfficiency: number;
      lowPerceivedSleepQuality: number;
      impactOnDaytimeFunction: number;
      notManagedSleepDisorders: number;
      useOfSleepMedication: number;
    };
    men: {
      poorSleepHealth: number;
      shortSleep: number;
      poorSleepEfficiency: number;
      lowPerceivedSleepQuality: number;
      impactOnDaytimeFunction: number;
      notManagedSleepDisorders: number;
      useOfSleepMedication: number;
    };
  };
};

export const fetchPDFData = async (department: any): Promise<PDFData> => {
  const data = {
    date: '',
    companyName: '',
    participationUptake: 0,
    genderDistribution: {
      men: 0,
      women: 0,
      nonBinary: 0,
      notSaid: 0,
    },
    sleepHealthScore: {
      score: 0,
      poor: {
        all: 0,
        men: 0,
        women: 0,
      },
      fair: {
        all: 0,
        men: 0,
        women: 0,
      },
      excellent: {
        all: 0,
        men: 0,
        women: 0,
      },
      textValue: '',
    },
    screeningPeriod: {
      start: '',
      end: '',
    },
    sleepDuration: {
      average: 0,
      data: {
        '5h': 0,
        '6h': 0,
        '7h': 0,
        '8h': 0,
        '9h': 0,
        '10h': 0,
        '11h': 0,
      },
      women: { lessThan7: 0, between7and9: 0, moreThan9: 0 },
      men: { lessThan7: 0, between7and9: 0, moreThan9: 0 },
    },
    sleepEfficiency: {
      poorSleepEfficiency: 0,
      all: 0,
      men: 0,
      women: 0,
    },
    perceivedSleepQuality: {
      average: 0,
      women: 0,
      men: 0,
    },
    daytimeFunction: {
      average: 0,
      women: 0,
      men: 0,
    },
    ageDistribution: {
      average: 0,
      '20-29': 0,
      '30-39': 0,
      '40-49': 0,
      '50-59': 0,
      '60-69': 0,
    },
    sleepDisorder: {
      yes: 0,
      no: 0,
      mostCommon: '',
      others: [''],
    },
    sleepManagement: {
      allEmployees: { wellManaged: 0, notManaged: 0 },
      women: { wellManaged: 0, notManaged: 0 },
      men: { wellManaged: 0, notManaged: 0 },
    },
    sleepMedication: {
      yes: 0,
      no: 0,
      allEmployess: {
        usingMedication: 0,
        withSleepDisorder: 0,
        withoutSleepDisorder: 0,
      },
      women: {
        usingMedication: 0,
        withSleepDisorder: 0,
        withoutSleepDisorder: 0,
      },
      men: {
        usingMedication: 0,
        withSleepDisorder: 0,
        withoutSleepDisorder: 0,
      },
    },
    summary: {
      allCount: 0,
      womenCount: 0,
      menCount: 0,
      all: {
        poorSleepHealth: 0,
        shortSleep: 0,
        poorSleepEfficiency: 0,
        lowPerceivedSleepQuality: 0,
        impactOnDaytimeFunction: 0,
        notManagedSleepDisorders: 0,
        useOfSleepMedication: 0,
      },
      women: {
        poorSleepHealth: 0,
        shortSleep: 0,
        poorSleepEfficiency: 0,
        lowPerceivedSleepQuality: 0,
        impactOnDaytimeFunction: 0,
        notManagedSleepDisorders: 0,
        useOfSleepMedication: 0,
      },
      men: {
        poorSleepHealth: 0,
        shortSleep: 0,
        poorSleepEfficiency: 0,
        lowPerceivedSleepQuality: 0,
        impactOnDaytimeFunction: 0,
        notManagedSleepDisorders: 0,
        useOfSleepMedication: 0,
      },
    },
  };

  const assessments = department.assessments as any[];
  const company = department.company as any;

  const sleepHealthScores: number[] = [];
  const sleepDurations: number[] = [];
  const sleepQualityMen: number[] = [];
  const sleepQualityWomen: number[] = [];
  const daytimeFunctionMen: number[] = [];
  const daytimeFunctionWomen: number[] = [];
  const ages: number[] = [];
  const disorders: Record<string, number> = {};
  let startDate = assessments[0].created;
  let endDate = assessments[0].created;

  for (const assessment of assessments) {
    const employee = await Employee.get({ id: assessment.employeeId });
    const score = assessment.score as Score;
    data.date = format(new Date(), 'dd MMMM yyyy');
    data.companyName = company.name;
    ages.push(employee.age);

    if (isBefore(new Date(assessment.created), new Date(startDate)))
      startDate = assessment.created;
    if (isAfter(new Date(assessment.created), new Date(endDate)))
      endDate = assessment.created;

    // Categories employee ages
    if (employee.age >= 20 && employee.age <= 29)
      data.ageDistribution['20-29']++;
    else if (employee.age >= 30 && employee.age <= 39)
      data.ageDistribution['30-39']++;
    else if (employee.age >= 40 && employee.age <= 49)
      data.ageDistribution['40-49']++;
    else if (employee.age >= 50 && employee.age <= 59)
      data.ageDistribution['50-59']++;
    else if (employee.age >= 60 && employee.age <= 69)
      data.ageDistribution['60-69']++;

    if (employee.gender.toLowerCase() === 'male') {
      data.genderDistribution.men++;

      sleepHealthScores.push(score.SleepHealthScorePercentage);
      if (score.SleepHealthScorePercentage <= 65) {
        data.sleepHealthScore.poor.men++;
        data.sleepHealthScore.poor.all++;
      } else if (score.SleepHealthScorePercentage <= 85) {
        data.sleepHealthScore.fair.men++;
        data.sleepHealthScore.fair.all++;
      } else {
        data.sleepHealthScore.excellent.men++;
        data.sleepHealthScore.excellent.all++;
      }

      sleepDurations.push(score.TST);
      if (score.TST < 6) data.sleepDuration.data['5h']++;
      else if (score.TST < 7) data.sleepDuration.data['6h']++;
      else if (score.TST < 8) data.sleepDuration.data['7h']++;
      else if (score.TST < 9) data.sleepDuration.data['8h']++;
      else if (score.TST < 10) data.sleepDuration.data['9h']++;
      else if (score.TST < 11) data.sleepDuration.data['10h']++;
      else data.sleepDuration.data['11h']++;

      if (score.TST < 8) data.sleepDuration.men.lessThan7++;
      else if (score.TST < 10) data.sleepDuration.men.between7and9++;
      else data.sleepDuration.men.moreThan9++;
      if (score.SE < 85) {
        data.sleepEfficiency.poorSleepEfficiency++;
        data.sleepEfficiency.men++;
        data.sleepEfficiency.all++;
      }
      sleepQualityMen.push(score.Quality);

      daytimeFunctionMen.push(score.DayTimeFunction);
      if (score.Disorder.toLowerCase() === 'yes') {
        data.sleepDisorder.yes++;
        data.sleepMedication.men.withSleepDisorder++;
        data.sleepMedication.allEmployess.withSleepDisorder++;
        let response = '';

        for (const question of assessment.questionnaire as {
          id: string;
          response: string;
        }[]) {
          if (question.id === '6b') response = question.response;
        }

        if (!(response.toLowerCase() in disorders))
          disorders[response.toLowerCase()] = 0;
        else disorders[response.toLowerCase()]++;

        if (score.DisorderManagement.toLowerCase() === 'yes') {
          data.sleepManagement.men.wellManaged++;
          data.sleepManagement.allEmployees.wellManaged++;
        } else {
          data.sleepManagement.men.notManaged++;
          data.sleepManagement.allEmployees.notManaged++;
        }
      } else {
        data.sleepDisorder.no++;
        data.sleepMedication.men.withoutSleepDisorder++;
        data.sleepMedication.allEmployess.withoutSleepDisorder++;
      }

      if (score.MedToSleep.toLowerCase() !== '0') {
        data.sleepMedication.men.usingMedication++;
        data.sleepMedication.yes++;
        data.sleepMedication.allEmployess.usingMedication++;
      } else {
        data.sleepMedication.no++;
      }

      data.summary.allCount++;
      data.summary.menCount++;
      if (score.SleepHealthScorePercentage <= 65) {
        data.summary.all.poorSleepHealth++;
        data.summary.men.poorSleepHealth++;
      }
      if (score.TST < 8) {
        data.summary.all.shortSleep++;
        data.summary.men.shortSleep++;
      }
      if (score.SE < 85) {
        data.summary.all.poorSleepEfficiency++;
        data.summary.men.poorSleepEfficiency++;
      }
      if (score.Quality < 5) {
        data.summary.all.lowPerceivedSleepQuality++;
        data.summary.men.lowPerceivedSleepQuality++;
      }
      if (
        score.Disorder.toLowerCase() === 'yes' &&
        score.DisorderManagement.toLowerCase() === 'no'
      ) {
        data.summary.all.notManagedSleepDisorders++;
        data.summary.men.notManagedSleepDisorders;
      }
      if (score.MedToSleep.toLowerCase() === 'yes') {
        data.summary.all.useOfSleepMedication++;
        data.summary.men.useOfSleepMedication++;
      }
    } else if (employee.gender.toLowerCase() === 'female') {
      data.genderDistribution.women++;

      sleepHealthScores.push(score.SleepHealthScorePercentage);
      if (score.SleepHealthScorePercentage <= 65) {
        data.sleepHealthScore.poor.women++;
        data.sleepHealthScore.poor.all++;
      } else if (score.SleepHealthScorePercentage <= 85) {
        data.sleepHealthScore.fair.women++;
        data.sleepHealthScore.fair.all++;
      } else {
        data.sleepHealthScore.excellent.women++;
        data.sleepHealthScore.excellent.all++;
      }

      sleepDurations.push(score.TST);
      if (score.TST < 6) data.sleepDuration.data['5h']++;
      else if (score.TST < 7) data.sleepDuration.data['6h']++;
      else if (score.TST < 8) data.sleepDuration.data['7h']++;
      else if (score.TST < 9) data.sleepDuration.data['8h']++;
      else if (score.TST < 10) data.sleepDuration.data['9h']++;
      else if (score.TST < 11) data.sleepDuration.data['10h']++;
      else data.sleepDuration.data['11h']++;

      if (score.TST < 8) data.sleepDuration.women.lessThan7++;
      else if (score.TST < 10) data.sleepDuration.women.between7and9++;
      else data.sleepDuration.women.moreThan9++;
      if (score.SE < 85) {
        data.sleepEfficiency.poorSleepEfficiency++;
        data.sleepEfficiency.women++;
        data.sleepEfficiency.all++;
      }
      sleepQualityWomen.push(score.Quality);

      daytimeFunctionWomen.push(score.DayTimeFunction);
      if (score.Disorder.toLowerCase() === 'yes') {
        data.sleepDisorder.yes++;
        data.sleepMedication.women.withSleepDisorder++;
        data.sleepMedication.allEmployess.withSleepDisorder++;
        let response = '';

        for (const question of assessment.questionnaire as {
          id: string;
          response: string;
        }[]) {
          if (question.id === '6b') response = question.response;
        }

        if (!(response.toLowerCase() in disorders))
          disorders[response.toLowerCase()] = 1;
        else disorders[response.toLowerCase()]++;

        if (score.DisorderManagement.toLowerCase() === 'yes') {
          data.sleepManagement.women.wellManaged++;
          data.sleepManagement.allEmployees.wellManaged++;
        } else {
          data.sleepManagement.women.notManaged++;
          data.sleepManagement.allEmployees.notManaged++;
        }
      } else {
        data.sleepDisorder.no++;
        data.sleepMedication.women.withoutSleepDisorder++;
        data.sleepMedication.allEmployess.withoutSleepDisorder++;
      }

      if (score.MedToSleep.toLowerCase() !== '0') {
        data.sleepMedication.women.usingMedication++;
        data.sleepMedication.yes++;
        data.sleepMedication.allEmployess.usingMedication++;
      } else {
        data.sleepMedication.no++;
      }

      data.summary.allCount++;
      data.summary.womenCount++;
      if (score.SleepHealthScorePercentage <= 65) {
        data.summary.all.poorSleepHealth++;
        data.summary.women.poorSleepHealth++;
      }
      if (score.TST < 8) {
        data.summary.all.shortSleep++;
        data.summary.women.shortSleep++;
      }
      if (score.SE < 85) {
        data.summary.all.poorSleepEfficiency++;
        data.summary.women.poorSleepEfficiency++;
      }
      if (score.Quality < 5) {
        data.summary.all.lowPerceivedSleepQuality++;
        data.summary.women.lowPerceivedSleepQuality++;
      }
      if (
        score.Disorder.toLowerCase() === 'yes' &&
        score.DisorderManagement.toLowerCase() === 'no'
      ) {
        data.summary.all.notManagedSleepDisorders++;
        data.summary.women.notManagedSleepDisorders;
      }
      if (score.MedToSleep.toLowerCase() === 'yes') {
        data.summary.all.useOfSleepMedication++;
        data.summary.women.useOfSleepMedication++;
      }
    } else if (employee.gender.toLowerCase() === 'non-binary') {
      data.genderDistribution.nonBinary++;
    } else if (employee.gender.toLowerCase() === 'prefer not to say') {
      data.genderDistribution.notSaid++;
    }
  }

  const averageSleepHealthScore = reduceList(sleepHealthScores);
  const averageSleepDuration = reduceList(sleepDurations);
  const averageSleepQualityMen = reduceList(sleepQualityMen);
  const averageSleepQualityWomen = reduceList(sleepQualityWomen);
  const averageDaytimeFunctionMen = reduceList(daytimeFunctionMen);
  const averageDaytimeFunctionWomen = reduceList(daytimeFunctionWomen);
  const averageAges = reduceList(ages);
  let mostCommonDisorder = '';
  let disorderCount = 0;
  const others: string[] = [];
  for (const [disorder, count] of Object.entries(disorders)) {
    if (
      !others.includes(disorder) &&
      ![
        'insomnia',
        'sleep apnoea',
        'restless legs syndrome',
        'narcolepsy',
      ].includes(disorder.toLowerCase())
    )
      others.push(disorder);
    if (disorderCount < count) {
      disorderCount = count;
      mostCommonDisorder = disorder;
    }
  }

  data.sleepHealthScore.score = parseFloat(averageSleepHealthScore);
  data.sleepDuration.average = parseFloat(averageSleepDuration);
  data.perceivedSleepQuality.men = parseFloat(averageSleepQualityMen);
  data.perceivedSleepQuality.women = parseFloat(averageSleepQualityWomen);
  data.ageDistribution.average = parseInt(averageAges);
  data.perceivedSleepQuality.average = parseFloat(
    reduceList([...sleepQualityWomen, ...sleepQualityMen])
  );
  data.daytimeFunction.men = parseFloat(averageDaytimeFunctionMen);
  data.daytimeFunction.women = parseFloat(averageDaytimeFunctionWomen);
  data.daytimeFunction.average = parseFloat(
    reduceList([...daytimeFunctionWomen, ...daytimeFunctionMen])
  );
  data.sleepDisorder.mostCommon = mostCommonDisorder;
  data.sleepDisorder.others = others;
  data.participationUptake =
    department.employeeSize > 0
      ? Math.round((assessments.length / department.employeeSize) * 100)
      : 0;
  data.screeningPeriod.start = startDate;
  data.screeningPeriod.end = endDate;

  if (data.sleepHealthScore.score <= 65)
    data.sleepHealthScore.textValue = 'poor';
  else if (data.sleepHealthScore.score <= 85)
    data.sleepHealthScore.textValue = 'fair';
  else data.sleepHealthScore.textValue = 'excellent';

  return data;
};

const reduceList = (list: number[]) => {
  const length = list.length;
  if (length === 0) return '0';
  return (
    list.reduce(
      (previousValue, currentValue) => previousValue + currentValue,
      0
    ) / length
  ).toFixed(2);
};
