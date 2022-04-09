import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { Cell } from '../../ui/Layout';
import UIInput from '../../ui/input';
import ToggleSwitch from '../../ui/toggle-switch';
import TextButton from '../../TextButton';
import Heading from '../../ui/heading';

import ComponentSource from '../../ComponentSource';
import List from './list';
import Option from './option';

import styles from './styles.scss';

const Preview = ({
  children,
  isRtl,
  onToggleRtl,
  isDarkBackground,
  onToggleBackground,
  onRemountComponent,
}) => (
  <Cell span={6}>
    <div className={styles.title}>
      <Heading>Preview</Heading>

      <div className={styles.previewControls}>
        <div className={styles.previewControl}>
          <TextButton size="small" onClick={onRemountComponent}>
            Remount Component
          </TextButton>
        </div>
        <div className={styles.previewControl}>
          Imitate RTL:&nbsp;
          <ToggleSwitch size="small" checked={isRtl} onChange={onToggleRtl} />
        </div>

        <div className={styles.previewControl}>
          Dark Background:&nbsp;
          <ToggleSwitch
            size="small"
            checked={isDarkBackground}
            onChange={onToggleBackground}
          />
        </div>
      </div>
    </div>

    <div
      {...{
        className: classnames(styles.preview, {
          rtl: isRtl,
          [styles.darkPreview]: isDarkBackground,
        }),
        ...(isRtl ? { dir: 'rtl' } : {}),
      }}
    >
      {children}
    </div>
  </Cell>
);

Preview.propTypes = {
  children: PropTypes.node,
  isRtl: PropTypes.bool,
  isDarkBackground: PropTypes.bool,
  onToggleRtl: PropTypes.func,
  onToggleBackground: PropTypes.func,
  onRemountComponent: PropTypes.func,
};

const Toggle = ({ value, onChange }) => (
  <ToggleSwitch checked={value} onChange={onChange} />
);

Toggle.propTypes = {
  value: PropTypes.bool,
  onChange: PropTypes.func,
};

const createInput = ({ type = 'string', property }) => ({
  value: inputValue,
  onChange,
  defaultValue,
  ...props
}) => (
  <UIInput
    value={inputValue}
    onChange={({ target }) => onChange(target[property])}
    placeholder={defaultValue}
    type={type}
    {...props}
  />
);

const Input = createInput({ type: 'string', property: 'value' });
const NumberInput = createInput({ type: 'number', property: 'valueAsNumber' });

Input.propTypes = NumberInput.propTypes = {
  value: PropTypes.string,
  defaultValue: PropTypes.string,
  onChange: PropTypes.func,
};

const Code = ({ component }) => (
  <Cell>
    <div className={styles.title}>
      <Heading>Code</Heading>
    </div>

    <ComponentSource component={component} />
  </Cell>
);

Code.propTypes = {
  component: PropTypes.node.isRequired,
};

export { Option, Preview, Toggle, Input, NumberInput, List, Code };
