import React from "react";
import Select from "react-select";

const SelectStyle = {
    width: "135px",
    borderRadius: "100px",
    fontSize: "12px",
};

interface SelectToggleProps {
    options: string[]; 
    onChange: (selectedOption: { value: string; label: string } | null) => void; 
}

const SelectToggle: React.FC<SelectToggleProps> = ({ options, onChange }) => {
    const formattedOptions = options.map(option => ({
        value: option,
        label: option,
    }));

    return (
        <Select
            styles={{
                control: (provided, state) => ({
                    ...provided,
                    ...SelectStyle,
                    borderColor: state.isFocused ? "#007AFE" : provided.borderColor,
                }),
                menu: (provided) => ({
                    ...provided,
                    width: '120px', 
                }),
                option: (provided,state) => ({
                    ...provided,
                    width: "120px",
                    height: "30px",
                    fontSize: "12px",
                    padding: '8px',
                    color:"black",
                    backgroundColor: state.isFocused ? "#F5F5F5" : provided.borderColor,
                }),
                input: (provided) => ({
                    ...provided,
                    caretColor: "transparent",  
                    pointerEvents: "none",
                  }),
            }}
            placeholder={options[0]} 
            options={formattedOptions} 
            onChange={onChange}
        />
    );
};

export default SelectToggle;