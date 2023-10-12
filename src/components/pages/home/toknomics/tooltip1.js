import React from "react";

export default class ToolTip extends React.Component {
  render() {
    return (
      <div>
        <div className="toknoList">
          <ul>
            <li className="hover1 toknoleft toknoBtn1 toknLst">
              <div className="tokList_Left">
                <span>30%</span>
                <span>IDO</span>
              </div>
              <div className="tokList_Right">
                <span>KDM</span>
                <span>16 mil</span>
              </div>
              <div className="tooltip1">
                40% unlocked at TGE 4 months linear vesting
              </div>
            </li>
            <li
              id="TooltipExample2"
              className="hover2 toknoleft toknoBtn2 toknLst"
            >
              <div className="tokList_Left">
                <span>10%</span>
                <span>Team</span>
              </div>
              <div className="tokList_Right">
                <span>KDM</span>
                <span>10 mil</span>
              </div>
              <div className="tooltip1">
                2 months cliff 10 months linear vesting
              </div>
            </li>
            <li
              id="TooltipExample1"
              className="hover3 toknoleft toknoBtn3 toknLst"
            >
              <div className="tokList_Left">
                <span>15%</span>
                <span>Liquidity</span>
              </div>
              <div className="tokList_Right">
                <span>KDM</span>
                <span>15 mil</span>
              </div>
              <div className="tooltip1">40% TGE 6 months linear vesting</div>
            </li>
            <li
              id="TooltipExample1"
              className="hover4 toknoleft toknoBtn4 toknLst"
            >
              <div className="tokList_Left">
                <span>1%</span>
                <span>Flux Node Operators</span>
              </div>
              <div className="tokList_Right">
                <span>KDM</span>
                <span>1 mil</span>
              </div>
              <div className="tooltip1">
                1 months cliff 24 months linear vesting
              </div>
            </li>
            <li
              id="TooltipExample1"
              className="hover5 toknoleft toknoBtn5 toknLst"
            >
              <div className="tokList_Left">
                <span>3%</span>
                <span>Marketing & Partnership</span>
              </div>
              <div className="tokList_Right">
                <span>KDM</span>
                <span>3 mil</span>
              </div>
              <div className="tooltip1">
                2 months cliff 16 months linear vesting
              </div>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
