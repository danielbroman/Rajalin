import React from 'react';

export default function Spinner() {
  return (
    <div>
      <div className="container" style={{ height: '400px' }}>
        <div className="row">
          <div className="col-md-12" style={{ height: '400px' }}>
            <div
              className="loader"
              style={({ position: 'relative' }, { top: '45%' })}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
