import React from 'react';
import { FaTrashAlt } from "react-icons/fa";
import { HiCheckCircle } from "react-icons/hi";
import { Table } from 'reactstrap';
import tableImg from '../../../assets/nft-img2.png';

const WishlistTable = () => {
  return (
    <Table hover className='wishlistTable'>
      <thead>
        <tr>
          <th align='center'>#</th>
          <th>Collection</th>
          <th>Volume</th>
          <th>Floor Price</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td align="center">1</td>
          <td>
            <div className='tbleThumb'>
              <i>
                <img src={tableImg} alt='' />
                <HiCheckCircle />
              </i>
              <strong>Kadena Komodos</strong>
            </div>
          </td>
          <td>
            <span>6.8K KDA</span>
            <small>$6.5M <i>+485.8%</i></small>
          </td>
          <td>
            <span>1.58 KDA</span>
            <small>$5,1489</small>
          </td>
          <td><FaTrashAlt /></td>
        </tr>
        <tr>
          <td align="center">2</td>
          <td>
            <div className='tbleThumb'>
              <i>
                <img src={tableImg} alt='' />
                <HiCheckCircle />
              </i>
              <strong>Kadena Komodos</strong>
            </div>
          </td>
          <td>
            <span>6.8K KDA</span>
            <small>$6.5M <i>+485.8%</i></small>
          </td>
          <td>
            <span>1.58 KDA</span>
            <small>$5,1489</small>
          </td>
          <td><FaTrashAlt /></td>
        </tr>
        <tr>
          <td align="center">3</td>
          <td>
            <div className='tbleThumb'>
              <i>
                <img src={tableImg} alt='' />
                <HiCheckCircle />
              </i>
              <strong>Kadena Komodos</strong>
            </div>
          </td>
          <td>
            <span>6.8K KDA</span>
            <small>$6.5M <i>+485.8%</i></small>
          </td>
          <td>
            <span>1.58 KDA</span>
            <small>$5,1489</small>
          </td>
          <td><FaTrashAlt /></td>
        </tr>
        <tr>
          <td align="center">4</td>
          <td>
            <div className='tbleThumb'>
              <i>
                <img src={tableImg} alt='' />
                <HiCheckCircle />
              </i>
              <strong>Kadena Komodos</strong>
            </div>
          </td>
          <td>
            <span>6.8K KDA</span>
            <small>$6.5M <i>+485.8%</i></small>
          </td>
          <td>
            <span>1.58 KDA</span>
            <small>$5,1489</small>
          </td>
          <td><FaTrashAlt /></td>
        </tr>
        <tr>
          <td colSpan="5" className='emptywishlist' style={{ display: 'none' }}>
            <h4>No Collections Found</h4>
            <span>You are not watching any collections</span>
            <button>Explore Collections</button>
          </td>
        </tr>
      </tbody>
    </Table>
  );
}

export default WishlistTable
