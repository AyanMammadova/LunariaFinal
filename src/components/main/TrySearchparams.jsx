import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ColorSizeSelector() {
  const colors = ['Red', 'Green', 'Blue', 'Yellow', 'Purple']; // Array of colors
  const sizes = ['Small', 'Medium', 'Large', 'XL', 'XXL']; // Array of sizes
  const [selectedColors, setSelectedColors] = useState([]); // Array to keep track of selected colors
  const [selectedSizes, setSelectedSizes] = useState([]); // Array to keep track of selected sizes
  const navigate = useNavigate(); // React Router navigate hook

  // Handle color click
  const handleColorClick = (color) => {
    setSelectedColors((prevSelectedColors) => {
      const newSelectedColors = prevSelectedColors.includes(color)
        ? prevSelectedColors.filter((selected) => selected !== color) // Remove color
        : [...prevSelectedColors, color]; // Add color
      updateUrl(newSelectedColors, selectedSizes); // Update the URL with new selected colors and sizes
      return newSelectedColors;
    });
  };

  // Handle size click
  const handleSizeClick = (size) => {
    setSelectedSizes((prevSelectedSizes) => {
      const newSelectedSizes = prevSelectedSizes.includes(size)
        ? prevSelectedSizes.filter((selected) => selected !== size) // Remove size
        : [...prevSelectedSizes, size]; // Add size
      updateUrl(selectedColors, newSelectedSizes); // Update the URL with new selected colors and sizes
      return newSelectedSizes;
    });
  };

  const updateUrl = (newSelectedColors, newSelectedSizes) => {
    navigate(`?${newSelectedColors.length>0 ? `colors=${newSelectedColors.join(',')}` : ''}${newSelectedSizes.length>0 ? `&sizes=${newSelectedSizes.join(',')}` : ''}`); // Update the URL query parameters
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const colorsFromUrl = urlParams.get('colors');
    const sizesFromUrl = urlParams.get('sizes');
    
    if (colorsFromUrl) {
      setSelectedColors(colorsFromUrl.split(','));
    }
    
    if (sizesFromUrl) {
      setSelectedSizes(sizesFromUrl.split(','));
    }
  }, []);

  return (
    <div>
      <div>
        <h3>Available Colors</h3>
        <div style={{ display: 'flex', gap: '10px' }}>
          {colors.map((color, index) => (
            <div
              key={index}
              onClick={() => handleColorClick(color)}
              style={{
                width: '50px',
                height: '50px',
                backgroundColor: color.toLowerCase(),
                cursor: 'pointer',
                border: selectedColors.includes(color) ? '3px solid black' : 'none',
              }}
            />
          ))}
        </div>
      </div>

      <div>
        <h3>Available Sizes</h3>
        <div style={{ display: 'flex', gap: '10px' }}>
          {sizes.map((size, index) => (
            <div
              key={index}
              onClick={() => handleSizeClick(size)}
              style={{
                padding: '10px',
                border: '1px solid black',
                cursor: 'pointer',
                borderRadius: '5px',
                backgroundColor: selectedSizes.includes(size) ? 'gray' : 'white',
              }}
            >
              {size}
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3>Selected Colors</h3>
        <p>{selectedColors.length > 0 ? selectedColors.join(', ') : 'None'}</p>
      </div>

      <div>
        <h3>Selected Sizes</h3>
        <p>{selectedSizes.length > 0 ? selectedSizes.join(', ') : 'None'}</p>
      </div>
    </div>
  );
}

export default ColorSizeSelector;
