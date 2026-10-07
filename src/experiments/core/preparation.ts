export interface ExperimentPreparationToolDefinition<
  TToolId extends string,
> {
  id:
    TToolId

  name:
    string

  description?:
    string

  /**
   * Tạm thời để string nhằm tương thích
   * dữ liệu lab-old / lab-new.
   *
   * Sau migration có thể chuyển
   * sang AppIconName nếu cần.
   */
  icon?:
    string

  correct:
    boolean
}