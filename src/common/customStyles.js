const customStyles = {
    control: (provided, state) => ({
      ...provided,
      minHeight: "30px",
      height: "30px",
    }),
  
    valueContainer: (provided, state) => ({
      ...provided,
      height: "30px",
      padding: "0 6px",
    }),
  
    input: (provided, state) => ({
      ...provided,
      margin: "0px",
      fontSize: "14px",
    }),
    indicatorSeparator: (state) => ({
      display: "none",
    }),
    indicatorsContainer: (provided, state) => ({
      ...provided,
      height: "30px",
    }),
    option: (provided, state) => ({
      ...provided,
      padding: 1,
      fontSize: 14,
      paddingLeft: 7,
      zIndex: 99999999,
    }),
    placeholder: (provided, state) => ({
      ...provided,
      fontSize: 14,
    }),
  };
  
  export default customStyles;
  