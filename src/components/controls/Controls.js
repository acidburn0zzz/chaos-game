import _ from 'lodash';
import React from 'react';

import Games from '../../constants/games';
import { CONTROL_TYPES, CONTROLS } from '../../constants/controls';
import ColorControls from './ColorControls';
import ExclusionControl from './ExclusionControl';
import RadioControl from './RadioControl';
import TransformControls from './TransformControls';

import './controls.css';

const mapControlOptionsToRadioOptions = control => (
  control.options.map(({name}, index) => ({
    name,
    value: index
  }))
);

const Control = ({title, description, children}) => (
  <div className="controls__control">
    <h3 className="controls__control-title">
      {title}
    </h3>
    {description &&
      <p className="controls__control-description">{description}</p>}
    <div className="controls__control-children">
      {children}
    </div>
  </div>
);

const Controls = ({ controls, fixedNumTransforms, onChange }) => {
  const game = Games[CONTROLS[CONTROL_TYPES.GAME].extractValueFrom(controls)];
  const historyControls = game.additionalControls.includes(CONTROL_TYPES.HISTORY) && (
    <Control
      title="Target History"
      description="The number of previous targets to take into consideration when choosing the next target."
    >
      <RadioControl
        buttonStyle={true}
        selectedValue={controls[CONTROL_TYPES.HISTORY]}
        options={mapControlOptionsToRadioOptions(CONTROLS[CONTROL_TYPES.HISTORY])}
        onChange={index => onChange(CONTROL_TYPES.HISTORY, index)}
      />
    </Control>
  );

  return (
    <div className="controls">
      <Control
        title="Variation"
        description="Change the core rules of the chaos game."
      >
        <RadioControl
          selectedValue={controls[CONTROL_TYPES.GAME]}
          options={mapControlOptionsToRadioOptions(CONTROLS[CONTROL_TYPES.GAME])}
          onChange={index => onChange(CONTROL_TYPES.GAME, index)}
        />
        <p className="controls__description">{game.description}</p>
      </Control>

      {historyControls}

      <Control title="Number of Points">
        <RadioControl
          buttonStyle={true}
          selectedValue={controls[CONTROL_TYPES.NUM_TARGETS]}
          options={mapControlOptionsToRadioOptions(CONTROLS[CONTROL_TYPES.NUM_TARGETS])}
          onChange={index => onChange(CONTROL_TYPES.NUM_TARGETS, index)}
        />
      </Control>

      <Control
        title="Exclusions"
        description="When choosing the next target point, you can optionally tell the chaos game to not select a particular neighbor based on the previously selected target(s)."
      >
        <ExclusionControl
          controls={controls}
          onChange={onChange}
        />
      </Control>

      <Control
        title="Transformations"
        description="Adjust the core rules of the Chaos Game below."
      >
        <TransformControls
          controls={controls}
          fixedNumTransforms={fixedNumTransforms}
          onChange={onChange}
        />
      </Control>

      <Control title="Colors">
        <ColorControls
          controls={controls}
          onChange={onChange}
        />
      </Control>

      <Control
        title="Rendering Quality"
        description="Adjusts the size of the point drawn on every iteration."
      >
        <RadioControl
          buttonStyle
          selectedValue={controls[CONTROL_TYPES.QUALITY]}
          options={mapControlOptionsToRadioOptions(CONTROLS[CONTROL_TYPES.QUALITY])}
          onChange={index => onChange(CONTROL_TYPES.QUALITY, index)}
        />
      </Control>

      <Control
        title="Rendering Speed"
        description="Adjusts the number of points drawn. Faster speeds require more CPU usage."
      >
        <RadioControl
          buttonStyle
          selectedValue={controls[CONTROL_TYPES.SPEED]}
          options={mapControlOptionsToRadioOptions(CONTROLS[CONTROL_TYPES.SPEED])}
          onChange={index => onChange(CONTROL_TYPES.SPEED, index)}
        />
      </Control>
    </div>
  );
};

export default Controls;
