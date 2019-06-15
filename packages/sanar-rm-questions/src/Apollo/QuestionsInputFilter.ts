export interface QuestionsInputFilter {
    specialtiesIds?: string[],
    tagsIds?: string[],
    state?: string,
    year?: string,
    isCommentedByExpert?: boolean;
}
