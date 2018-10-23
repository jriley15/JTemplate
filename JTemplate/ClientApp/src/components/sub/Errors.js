import React from 'react';


export default function(id, props) {

    
    if (props) {
        let errors = [];
        props.forEach((error) => {
          if (error.key === id) {
            errors.push(error);
          }
        });
        return (
          <div className="error">
            {errors.map(error => (
              <div className="station" key={error.key}>{error.message}</div>
            ))}
          </div>
        );
      }

      return null;


}