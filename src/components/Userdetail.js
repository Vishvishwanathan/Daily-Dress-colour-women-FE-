import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AxiosService from "../common/ApiService";
import { toast } from "react-toastify";

const Userdetail = () => {
  let navigate = useNavigate();
  let id = sessionStorage.getItem("id");
  const colorOptions = [
    "Red",
    "Blue",
    "Green",
    "Yellow",
    "Orange",
    "Purple",
    "Pink",
    "Brown",
    "Black",
    "White",
    "Gray",
    "Cyan",
    "Magenta",
    "Lime",
    "Teal",
    "Indigo",
    "Violet",
    "Maroon",
    "Olive",
    "Navy",
    "Aquamarine",
    "Turquoise",
    "Silver",
  ];

  const [selectedDressColors, setSelectedDressColors] = useState([]);
  const [showDressColorOptions, setShowDressColorOptions] = useState(false);

  const [selectedShoeColors, setSelectedShoeColors] = useState([]);
  const [showShoeColorOptions, setShowShoeColorOptions] = useState(false);

  const [selectedWatchColors, setSelectedWatchColors] = useState([]);
  const [showWatchColorOptions, setShowWatchColorOptions] = useState(false);

  const [selectedBagColors, setSelectedBagColors] = useState([]);
  const [showBagColorOptions, setShowBagColorOptions] = useState(false);

  const fetchData = async () => {
    try {
      const res = await AxiosService.get(`/login/${id}`);

      setSelectedDressColors(res.data.user.dresscolor);
      setSelectedShoeColors(res.data.user.shoecolor);
      setSelectedWatchColors(res.data.user.watchcolor);
      setSelectedBagColors(res.data.user.bagcolor);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCheckboxChange = (color, setSelectedColors) => {
    setSelectedColors((prevColors) => {
      const isSelected = prevColors.includes(color);
      return isSelected
        ? prevColors.filter((selectedColor) => selectedColor !== color)
        : [...prevColors, color];
    });
  };

  const handleToggleColorOptions = (setShowColorOptions) => {
    setShowColorOptions((prev) => !prev);
  };

  const handleInputChange = (e, setSelectedColors, setShowColorOptions) => {
    const { name, value, checked, type } = e.target;

    if (type === "checkbox") {
      handleCheckboxChange(value, setSelectedColors);
    } else {
      setSelectedColors([value]);
    }
  };

  const createColorInputSection = (
    label,
    selectedColors,
    setSelectedColors,
    showColorOptions,
    setShowColorOptions
  ) => (
    <div className="mb-3 col-md-6 position-relative">
      <label htmlFor={`${label.toLowerCase()}Color`} className="form-label">
        {label} Color
      </label>
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          id={`${label.toLowerCase()}Color`}
          name={label.toLowerCase()}
          value={(selectedColors || []).join(", ")}
          readOnly
        />
        <button
          className="btn btn-outline-secondary"
          type="button"
          onClick={() => handleToggleColorOptions(setShowColorOptions)}
        >
          +
        </button>
      </div>
      {showColorOptions && (
        <div
          className="color-options-wrapper position-absolute top-100 start-0"
          style={{ transform: "translate(280px, -40px)" }}
        >
          <div
            className="color-options"
            style={{ maxHeight: "50vh", overflowY: "scroll", width: "100%" }}
          >
            {colorOptions.map((color) => (
              <div key={color} className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id={`${label.toLowerCase()}-${color}`}
                  name={label.toLowerCase()}
                  value={color}
                  checked={selectedColors?.includes(color)}
                  onChange={(e) =>
                    handleInputChange(e, setSelectedColors, setShowColorOptions)
                  }
                />
                <label
                  className="form-check-label"
                  htmlFor={`${label.toLowerCase()}-${color}`}
                >
                  {color}
                </label>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  let validateuserdetails = async (event) => {
    try {
      event.preventDefault();

      const dresscolor = selectedDressColors;
      const shoecolor = selectedShoeColors;
      const watchcolor = selectedWatchColors;
      const bagcolor = selectedBagColors;

      let res = await AxiosService.put(`/login/${id}`, {
        dresscolor,
        shoecolor,
        watchcolor,
        bagcolor,
      });

      if (res.status === 200) {
        toast.success("User updated Successfully")
        navigate("/dashboard");
      }
    } catch (error) {
      toast.error(error.response.data.message || "Error Occurred! Please try after some time")
    }
  };

  return (
    <div className="container dash1 txt">
      <h1>Color Form</h1>
      <form className="row g-3">
        <div className="col-12 col-md-6">
          {createColorInputSection(
            "Dress",
            selectedDressColors,
            setSelectedDressColors,
            showDressColorOptions,
            setShowDressColorOptions
          )}
        </div>
        <div className="col-12 col-md-6">
          {createColorInputSection(
            "Shoe",
            selectedShoeColors,
            setSelectedShoeColors,
            showShoeColorOptions,
            setShowShoeColorOptions
          )}
        </div>
        <div className="col-12 col-md-6">
          {createColorInputSection(
            "Watch",
            selectedWatchColors,
            setSelectedWatchColors,
            showWatchColorOptions,
            setShowWatchColorOptions
          )}
        </div>
        <div className="col-12 col-md-6">
          {createColorInputSection(
            "Bag",
            selectedBagColors,
            setSelectedBagColors,
            showBagColorOptions,
            setShowBagColorOptions
          )}
        </div>
        <div className="col-md-12">
          <button
            className="btn-primary btn1"
            onClick={(event) => validateuserdetails(event)}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default Userdetail;