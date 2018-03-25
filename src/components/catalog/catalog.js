import React from 'react';
import CSSModules from 'react-css-modules';
import ReactDOM from 'react-dom';

import Libraries from '../../containers/libraries/libraries';
import Tables from '../../containers/tables/tables';
import styles from './catalog.css';

class Catalog extends React.Component {
  constructor() {
    super();
    this.state = {
      tab: "timetables",
    }
    this.selectTab = this.selectTab.bind(this);
  }

  selectTab(e) {
    const selectedTab = this.state.tab;
    const tab = e.currentTarget.getAttribute("id");
    if (tab !== selectedTab) {
      this.setState({tab});
    }
  }

  render() {
    const {tab} = this.state;
    return (
      <div styleName="content">
        <ul className="tabs" styleName="tabs">
          <li className="tab col s3 z-depth-1" styleName={`tab ${tab === 'timetables' ? 'active' : ''}`} id="timetables" onClick={this.selectTab}><a>Расписания</a></li>
          <li className="tab col s3 z-depth-1" styleName={`tab ${tab === 'libraries' ? 'active' : ''}`} id="libraries"  onClick={this.selectTab}><a>Библиотеки</a></li>
        </ul>
        {
          tab === 'timetables' &&
            <Tables />
        }
        {
          tab === 'libraries' &&
            <Libraries />
        }
      </div>
    );
  }
}

export default CSSModules(Catalog, styles, {allowMultiple: true});
