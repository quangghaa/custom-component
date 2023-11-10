import { useState } from "react"
import "./filter_popup_style.css"
type FilterType = { text: string, value: string }
interface Props {
    isOpen: boolean
    setIsOpen: (value: boolean) => void
    filters: FilterType[]
    onFilter?: (value: any, record: any) => boolean
    sorter?: (a: any, b: any) => number
    handleOk: (selectedValues: string[], onFilter?: (value: any, record: any) => boolean, sorter?: (a: any, b: any) => number) => void
    handleReset: () => void
}
const FilterPopup: React.FC<Props> = (props) => {
    const { isOpen, setIsOpen, filters, onFilter, sorter, handleOk } = props

    const [selectedValues, setSelectedValues] = useState<string[]>([])

    function togglePopup(isOpen: boolean) {
        const element = document.getElementById("filter-popup-id")
        if (element) isOpen ? element.style.visibility = "visible" : element.style.visibility = "hidden"
    }
    togglePopup(isOpen)

    function onItemClick(e: any) {
        e.stopPropagation()
        const checkedInputs = document.querySelectorAll('ul.filter-popup__content input[type="checkbox"]:checked');
        // Extract the id attribute (or htmlFor) from each checked input
        const _selectedValues = Array.from(checkedInputs).map((input) => input.id);
        setSelectedValues(_selectedValues)
    }

    function onOk(e: any) {
        e.stopPropagation()
        const checkedInputs = document.querySelectorAll('ul.filter-popup__content input[type="checkbox"]:checked');
        // Extract the id attribute (or htmlFor) from each checked input
        const _selectedValues = Array.from(checkedInputs).map((input) => input.id);

        console.log(">> _selectedValues: ", _selectedValues)
        handleOk(_selectedValues, onFilter, sorter)
        setIsOpen(false)
    }

    function onReset(e: any) {
        e.stopPropagation()
        const inputs = document.querySelectorAll('ul.filter-popup__content input[type="checkbox"]')
        inputs.forEach((checkbox: any) => {
            checkbox.checked = false;
        });
        setSelectedValues([])
    }

    return (
        <div id="filter-popup-id" className={"filter-popup"} >
            <ul className="filter-popup__content">
                {filters.map(item => (
                    <li key={item.value} onClick={onItemClick}>
                        <input id={item.value} type="checkbox" />
                        <label htmlFor={item.value}>{item.text}</label>
                    </li>
                ))}
            </ul>
            <div className="filter-popup__foot">
                <button disabled={selectedValues.length === 0} className="reset-button" onClick={onReset}>
                    Reset
                </button>
                <button className="ok-button" onClick={onOk}>
                    OK
                </button>
            </div>
        </div>
    )
}
export default FilterPopup