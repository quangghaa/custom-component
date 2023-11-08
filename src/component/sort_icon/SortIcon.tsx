import { AscendingSvg, DescendingSvg } from "../../svg/icon"
import "./style.css"
const SortIcon = (props: any) => {
    const { sortOrder } = props
    const ascendingHighlightCls = sortOrder === "ascending" ? "sort-icon--highlight" : ""
    const descendingHighlightCls = sortOrder === "descending" ? "sort-icon--highlight" : ""

    return (
        <div className="sort-icon">
            <span className={ascendingHighlightCls}>
                <AscendingSvg />
            </span>
            <span className={descendingHighlightCls}>
                <DescendingSvg />
            </span>
        </div>
    )
}
export default SortIcon