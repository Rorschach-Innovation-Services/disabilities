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
    const score = assessment.score;
    data.date = format(new Date(), 'dd MMMM yyyy');
    data.companyName = company.name;

    if (isBefore(new Date(assessment.created), new Date(startDate)))
      startDate = assessment.created;
    if (isAfter(new Date(assessment.created), new Date(endDate)))
      endDate = assessment.created;
  }
  return data;
};

const reduceList = (list: number[]) => {
  const length = list.length;
  if (length === 0) return '0';
  return (
    list.reduce(
      (previousValue, currentValue) => previousValue + currentValue,
      0,
    ) / length
  ).toFixed(2);
};
