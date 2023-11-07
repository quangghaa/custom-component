import { AscendingSvg, DescendingSvg } from "../../svg/icon"
import "./style.css"
const SortIcon = () => {
    return (
        <div className="sort-icon">
            <span>
                <AscendingSvg />
            </span>
            <span>
                <DescendingSvg />
            </span>
        </div>
    )
}
export default SortIcon