import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Collapse from 'react-collapse';
import styles from './styles.scss';

import CodeBlock from '../CodeBlock';
import TextButton from '../TextButton';

export default class CodeExample extends Component {
  static propTypes = {
    code: PropTypes.string,
    codeType: CodeBlock.propTypes.type,
    children: PropTypes.node,
    title: PropTypes.string,
    autoExpand: PropTypes.bool,
  };

  static defaultProps = {
    codeType: CodeBlock.defaultProps.type,
  };

  constructor(props) {
    super(props);

    this.state = {
      isOpened: !!props.autoExpand,
    };

    this.toggleCode = this.toggleCode.bind(this);
  }

  toggleCode() {
    this.setState({
      isOpened: !this.state.isOpened,
    });
  }

  render() {
    return (
      <div>
        <div className={styles.panelControl} style={{ display: 'flex' }}>
          <h2>{this.props.title}</h2>
          <div style={{ margin: '5px 0 0 7px' }}>
            <TextButton onClick={this.toggleCode}>
              {this.state.isOpened ? 'Hide' : 'Show'} code
            </TextButton>
          </div>
        </div>
        <Collapse isOpened={this.state.isOpened}>
          <CodeBlock source={this.props.code} type={this.props.codeType} />
        </Collapse>
        <div>{this.props.children}</div>
      </div>
    );
  }
}
