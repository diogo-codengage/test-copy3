export interface QuestionsInputFilter {
    specialtiesIds: string[],
    institutionsIds: string[],
    categoriesIds: string[],
    tagsIds: string[],
    state: string,
    years: string[],
    isCommentedByExpert: boolean;
    withImagesOnly: boolean;
}
