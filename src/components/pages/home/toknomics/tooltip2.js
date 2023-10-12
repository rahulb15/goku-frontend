import React from "react";

export default class ToolTip extends React.Component {
  render() {
    return (
      <div>
        <div className="toknoList">
          <ul>
            <li
              id="TooltipExample"
              className="hover6 toknoright toknoBtn6 toknLst"
            >
              <div className="tokList_Left">
                <span>30%</span>
                <span>P2E Rewards</span>
              </div>
              <div className="tokList_Right">
                <span>KDM</span>
                <span>30 mil</span>
              </div>
              <div className="tooltip1">
                unlocks with game launch 30 months linear vesting
              </div>
            </li>
            <li
              id="TooltipExample"
              className="hover7 toknoright toknoBtn7 toknLst"
            >
              <div className="tokList_Left">
                <span>15%</span>
                <span>Staking Rewards</span>
              </div>
              <div className="tokList_Right">
                <span>KDM</span>
                <span>15 mil</span>
              </div>
              <div className="tooltip1">
                1 month cliff 36 months linear vesting
              </div>
            </li>
            <li
              id="TooltipExample"
              className="hover8 toknoright toknoBtn8 toknLst"
            >
              <div className="tokList_Left">
                <span>2%</span>
                <span>Ecosystem Expansion</span>
              </div>
              <div className="tokList_Right">
                <span>KDM</span>
                <span>2 mil</span>
              </div>
              <div className="tooltip1">
                2 months cliff 16 months linear vesting
              </div>
            </li>
            <li
              id="TooltipExample"
              className="hover9 toknoright toknoBtn9 toknLst"
            >
              <div className="tokList_Left">
                <span>5%</span>
                <span>Reserves</span>
              </div>
              <div className="tokList_Right">
                <span>KDM</span>
                <span>5 mil</span>
              </div>
              <div className="tooltip1">
                12 months cliff 24 months linear vesting
              </div>
            </li>
            <li
              id="TooltipExample"
              className="hover10 toknoright toknoBtn10 toknLst"
            >
              <div className="tokList_Left">
                <span>3%</span>
                <span>KDM Advisory</span>
              </div>
              <div className="tokList_Right">
                <span>KDM</span>
                <span>3 mil</span>
              </div>
              <div className="tooltip1">
                12 months cliff 12 months linear vesting
              </div>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
