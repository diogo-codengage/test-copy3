export interface QuestionsInputFilter {
    specialtiesIds?: string[],
    tagsIds?: string[],
    state?: string,
    year?: number,
    isCommentedByExpert?: boolean;
}
