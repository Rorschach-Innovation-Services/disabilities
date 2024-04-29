/**
 * Score Response of the employees
 */

interface Question {
    id: string,
    content: string,
    response: string
}

/**
 * Score each response
 * @param questionnaire The list of questions with responses.
 * @returns An object with the scored questionnaire and other scores: { questionnaireScores, DisorderModifiedValue, TotalValue, MedModifiedTotalValue, SleepHealthScore, SleepHealthScorePercentage }
 */
const scoreSleepHealth = (questionnaire: Question[]) => {

    /**Time In Bed equation for question 1 */
    let TIB: number = 0;
    /**TIB Value */
    let TIBValue: number = 0;
    /**Number of hours sleeping */
    let TST: number = 0;
    /**TST Value */
    let TSTValue: number = 0;
    /**Sleep Disorder Question(YES or NO) */
    let Disorder: string = 'no';
    /** Disorder Value */
    let DisorderValue: number = 0;
    /** Disorder Management: default = 'no */
    let DisorderManagement: string = 'no';
    /** Disorder Management Value */
    let DisorderManagementValue: number = 0;
    /** Disorder Modified Value: Default of 1 */
    let DisorderModifiedValue: number = 1;
    /**SE variable */
    let SE: number = 0;
    /**SE Value */
    let SEValue: number = 0;
    /**Quality */
    let Quality: number = 0;
    /**Quality value */
    let QualityValue: number = 0;
    /** Day Time Function: Range: 1 - 10 */
    let DayTimeFunction: number = 0;
    /**Day Time Function Value */
    let DayTimeFunctionValue: number = 0;
    /**Medication to sleep: default = 'no' */
    let MedToSleep: string = 'no';
    /**Medication to sleep value */
    let MedToSleepValue: number = 0;
    /**Total Value, Range: 5 - 50 */
    let TotalValue: number = 0;
    /** Med Modified Value, Range: 3.33 - 50 */
    let MedModifiedTotalValue: number = 0;
    /**Sleep Health Score, Range: 0 - 46.667 */
    let SleepHealthScore: number = 0;
    /** SLeep Health Score Percentage */
    let SleepHealthScorePercentage: number = 0;

    questionnaire.forEach(question => {
        const { id, response } = question;

        /**Question 1: TIB and 3: TST */
        if (id === '1' || id === '3') {
            let input = 0;
            if (id === "1") input = (new Date(response).getHours()) + ((new Date(response).getMinutes()) / 60);
            if (id === "3") input = parseFloat(response);

            let scoring: number = 0;
            if (id === '1') {
                const wakeUpTime = new Date(questionnaire[1].response);
                const wakeUpTimeDecimal = wakeUpTime.getHours() + wakeUpTime.getMinutes()/60
                if (input <= 24 && input > 12) input = input;
                else if (input >= 0 && input <= 12) input = 24 + input;
                else input = 1;
                TIB = input < 24 ? 24 - input + wakeUpTimeDecimal : wakeUpTimeDecimal - (input - 24);
                scoring = TIB;
            }
            if(id === '3'){
                TST = input;
                scoring = TST;
            }

            /**Get the score value */
            if(scoring <= 4){
                TIBValue = 1;
                TSTValue = 1;
            }
            else if(scoring > 4 && scoring <= 4.5){
                TIBValue = 2;
                TSTValue = 2;
            }
            else if(scoring > 4.5 && scoring <= 5.5){
                TIBValue = 3;
                TSTValue = 3;
            }
            else if(scoring > 5.5 && scoring <= 5.75){
                TIBValue = 4;
                TSTValue = 4;
            }
            else if(scoring > 5.75 && scoring <= 6){
                TIBValue = 5;
                TSTValue = 5;
            }
            else if(scoring > 6 && scoring <= 6.25){
                TIBValue = 6;
                TSTValue = 6;
            }
            else if(scoring > 6.25 && scoring <= 6.5){
                if(id === '1') TIBValue = 7;
                if(id === '3') TSTValue = 7;
            }
            else if(scoring > 6.5 && scoring <= 6.75){
                TIBValue = 8;
                TSTValue = 8;
            }
            else if(scoring > 6.75 && scoring <= 9){
                TIBValue = 10;
                TSTValue = 10;
            }
            else if(scoring > 9 && scoring <= 9.25){
                TIBValue = 8;
                TSTValue = 8;
            }
            else if(scoring > 9.25 && scoring <= 9.75){
                TIBValue = 7;
                TSTValue = 7;
            }
            else if(scoring > 9.75 && scoring <= 10){
                TIBValue = 6;
                TSTValue = 6;
            }
            else if(scoring > 10 && scoring <= 10.25){
                TIBValue = 5;
                TSTValue = 5;
            }
            else if(scoring > 10.25 && scoring <= 10.5){
                TIBValue = 4;
                TSTValue = 4;
            }
            else if(scoring > 10.5 && scoring <= 11){
                TIBValue = 3;
                TSTValue = 3;
            }
            else if(scoring > 11 && scoring <= 11.5){
                TIBValue = 2;
                TSTValue = 2;
            }
            else if(scoring > 11.5 && scoring <= 20){
                TIBValue = 1;
                TSTValue = 1;
            }
            else{
                TIBValue = 1;
                TSTValue = 1;
            }
        }
        /**Question 4: Quality */
        else if(id === '4'){
            Quality = parseFloat(response);
            QualityValue = Quality * 1.25;
        }
        /**Question 5: Daytime function */
        else if(id === '5'){
            DayTimeFunction = 10 - parseFloat(response) + 1; // if dayTimeFunction === 10, score = 1
            DayTimeFunctionValue = DayTimeFunction * 1.25; 
        }
        /** Question 6: Sleep Disorder */
        else if(id === '6a'){
            Disorder = response.toLowerCase();
            if(Disorder === 'no'){
                DisorderValue = 10;
                DisorderModifiedValue = DisorderValue;
            }
            else{
                DisorderValue = 1;
            }
        }
        /**Question 8: Sleep disorder management  */
        else if(id === '6c'){
            DisorderManagement = response.toLowerCase();
            if(DisorderManagement === 'yes'){
                DisorderManagementValue = 5;
            }
            else{
                DisorderManagementValue = 1;
            }
        }
        /**Question 7: Medication to sleep: Number of Nights
         * Options - '0', '1 to 5' & '6 or more'
         */
        else if(id === '7'){
            MedToSleep = response.trim().toLowerCase();
            if (MedToSleep === '6 or more') MedToSleepValue = 1;
            else MedToSleepValue = 10;
        }
        return question;
    });

    /**Disorder Modified Value */
    if (Disorder === "no") DisorderModifiedValue = DisorderValue;
    else if (DisorderManagement === "yes") DisorderModifiedValue = 5;
    else if (DisorderManagement === "no") DisorderModifiedValue = 1;
    else DisorderModifiedValue = 1;

    /**Calculate SE and SEValue */
    if(TST < TIB) SE = (TST/TIB) * 100;
    else SE = 100;

    /**Score value */
    if(SE < 65) SEValue = 1;
    else if(SE >= 65 && SE < 70) SEValue = 2;
    else if(SE >= 70 && SE < 75) SEValue = 3;
    else if(SE >= 75 && SE < 80) SEValue = 4;
    else if(SE >= 80 && SE < 85) SEValue = 5;
    else if(SE >= 85 && SE < 86.5) SEValue = 6;
    else if(SE >= 86.5 && SE < 87.5) SEValue = 7;
    else if(SE >= 87.5 && SE < 90) SEValue = 8;
    else if(SE >= 90 && SE < 92.5) SEValue = 9;
    else if(SE >= 92.5 && SE <= 100) SEValue = 10;
    else SEValue = 1;

    /** Total Value calculatioon */
    if(TST > TIB) TotalValue = TIBValue + SEValue + QualityValue + DayTimeFunctionValue + DisorderModifiedValue;
    else TotalValue = TSTValue + SEValue + QualityValue + DayTimeFunctionValue + DisorderModifiedValue;
    

    /** Med Modified Value calculation */
    if(MedToSleepValue === 1) MedModifiedTotalValue = TotalValue/(1.5);
    else MedModifiedTotalValue = TotalValue;

    /**Calculate Sleep Health Score */
    SleepHealthScore = MedModifiedTotalValue - 3.667;

    /**Calculate Sleep Health Score Percentage */
    SleepHealthScorePercentage = (SleepHealthScore/51.33) * 100;

    return {
        TIB,
        TIBValue,
        TST,
        TSTValue,
        SE,
        SEValue,
        Quality,
        QualityValue,
        DayTimeFunction,
        DayTimeFunctionValue,
        Disorder,
        DisorderValue,
        DisorderManagement,
        DisorderManagementValue,
        DisorderModifiedValue,
        MedToSleep,
        MedToSleepValue,
        TotalValue,
        MedModifiedTotalValue,
        SleepHealthScore,
        SleepHealthScorePercentage,
    };
}


export default scoreSleepHealth;