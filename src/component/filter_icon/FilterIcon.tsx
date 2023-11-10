import { useState } from "react"
import { FilterSvg } from "../../svg/icon"
import FilterPopup from "./FilterPopup"
import "./style.css"

type FilterType = { text: string, value: string }
interface Props {
    filters: FilterType[]
    onFilter?: (value: any, record: any) => boolean
    sorter?: (a: any, b: any) => number
    handleReset: () => void
    handleOk: (selectedValues: string[], onFilter?: (value: any, record: any) => boolean, sorter?: (a: any, b: any) => number) => void
}
const FilterIcon: React.FC<Props> = (props) => {
    const { filters, onFilter, sorter, handleReset, handleOk } = props
    const [isOpen, setIsOpen] = useState(false)

    const onClickFilter = (e: any) => {
        e.stopPropagation();
        setIsOpen(!isOpen)
    }

    return (
        <div className="filter-icon"
            onClick={onClickFilter}
        >
            <FilterSvg />

            <FilterPopup
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                filters={filters}
                onFilter={onFilter}
                sorter={sorter}
                handleReset={handleReset}
                handleOk={handleOk}
            />
        </div>
    )
}
export default FilterIcon