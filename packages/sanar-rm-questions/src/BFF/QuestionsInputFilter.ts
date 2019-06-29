export interface QuestionsInputFilter {
    specialtiesIds: string[],
    institutionsIds: string[],
    tagsIds: string[],
    states: string[],
    years: string[],
    isCommentedByExpert: boolean;
}
