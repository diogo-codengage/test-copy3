export interface QuestionsInputFilter {
    specialtiesIds: string[],
    institutionsIds: string[],
    tagsIds: string[],
    state: string,
    years: string[],
    isCommentedByExpert: boolean;
}
