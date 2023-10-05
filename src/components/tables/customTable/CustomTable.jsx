// import React, { useState } from "react";
// import { Link } from "react-router-dom";
import Card from "../../UI/card/Card";
// import Badge from "../../UI/badge/Badge";
import Modal from "../../UI/modal/Modal";
// import { useTranslation } from "react-i18next";
// import { Icon } from "@iconify/react";
// import classes from "./CustomTable.module.scss";

import "./CustomTable.module.scss";


// const CustomTable = (props) => {
//   const [showModal, setShowModal] = useState(false);
//   // console.log(props);

//   function showModalHandler() {
//     setShowModal((prev) => !prev);
//   }

//   function tableBody(item, index) {
//     return (
//       <tr key={index}>
//         <td>{index}</td>
//         <td className={classes.product_name}>
//           {/* @mr stanley proposed that we dont need the image url in the display table of the pasrish so i'm commenting it out  */}
//           {/* <img className={classes.product_img} src={item.avatar} alt="user avatar" /> */}
//           {item.name}
//         </td>
//         <td>{item.pastorName}</td>
//         <td>{item.city}</td>
//         <td>{item.parishPhoneNumber}</td>
//         <td className={classes.actions}>
//           <Icon icon="charm:menu-kebab" />
//           <div className={classes.actions__box}>

//             <div className={classes.actions__delete} onClick={showModalHandler}>
//               <Icon icon="fluent:delete-24-regular" width="24" />
//             </div>

//             <div className={classes.actions__view}>
//                 <Link to={`/onboarding/view/${item.parishId}`}>
//                   <Icon icon="ic:baseline-remove-red-eye" width="24"/>
//                 </Link>
//             </div>

//             <div className={classes.actions__edit}>
//               <Link to={`/onboarding/edit/${item.parishId}`}>
//                 <Icon icon="fluent:edit-16-regular" width="24" />
//               </Link>
//             </div>
//           </div>
//         </td>
//       </tr>
//     );
//   }

//   function biometricTableBody(biometricItem, index) {
//     return (
//       <tr key={index}>
//         <td>{index}</td>
//         <td className={classes.product_name}>{biometricItem.productName}</td>
//         <td>{biometricItem.serialNumber}</td>
//         <td>{biometricItem.deviceId}</td>
//         {/* Add more fields specific to biometric data */}
//       </tr>
//     );
//   }

//   const initDataShow = () => {
//     return props.limit && props.bodyData ? props.bodyData.slice(0, Number(props.limit)) : props.bodyData;
//   };

//   const [dataShow, setDataShow] = useState(initDataShow);

//   let pages = 1;

//   let range = [];

//   if (props.limit !== undefined) {
//     let page = Math.floor(props.bodyData.length / Number(props.limit));
//     pages = props.bodyData.length % Number(props.limit) === 0 ? page : page + 1;
//     range = [...Array(pages).keys()];
//   }

//   const [currPage, setCurrPage] = useState(0);

//   const selectPage = (page) => {
//     const start = Number(props.limit) * page;
//     const end = start + Number(props.limit);

//     setDataShow(props.bodyData?.slice(start, end));

//     setCurrPage(page);
//   };

//   const { t } = useTranslation();

//   return (
//     <>
//       {/* modal for delete customer and product case*/}
//       {showModal ? (
//         <Modal
//           title={t("deleteCustomer")}
//           message={`${t("modalMessage")}`}
//           onConfirm={showModalHandler}
//         />
//       ) : null}

//       <div className={classes.container}>
//         <Card>
//           <div className={classes.wrapper}>
//             <div className={classes.table__wrapper}>
//               <table className={props.limit ? classes.largeTable : classes.table}>
//                 {props.headData ? (
//                   <thead>
//                     <tr>
//                       {props.headData.map((item, index) => (
//                         <th key={index}>{t(item)}</th>
//                       ))}
//                     </tr>
//                   </thead>
//                 ) : null}
//                 <tbody>{dataShow.map((item, index) => tableBody(item, index))}</tbody>
//                 <tbody>{dataShow.map((item, index) => biometricTableBody(item, index))}</tbody>
//               </table>
//             </div>

//             {pages > 1 ? (
//               <div className={classes.table__pagination}>
//                 {range.map((item, index) => (
//                   <div
//                     key={index}
//                     className={`${classes.table__pagination_item} ${
//                       currPage === index ? classes.active : ""
//                     }`}
//                     onClick={() => selectPage(index)}
//                   >
//                     {item + 1}
//                   </div>
//                 ))}
//               </div>
//             ) : null}
//           </div>
//         </Card>
//       </div>
//     </>
//   );
// };

// export default CustomTable;


import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import classes from "./CustomTable.module.scss";

const CustomTable = (props) => {
  const [showModal, setShowModal] = useState(false);

  function showModalHandler() {
    setShowModal((prev) => !prev);
  }

  function tableBody(item, index) {
    return (
      <tr key={index}>
        <td>{index}</td>
        <td className={classes.product_name}>
          {item.name}
        </td>
        <td>{item.pastorName}</td>
        <td>{item.city}</td>
        <td>{item.parishPhoneNumber}</td>

        <td className={classes.actions}>
          <Icon icon="charm:menu-kebab" />
          <div className={classes.actions__box}>
            <div className={classes.actions__delete} onClick={showModalHandler}>
              <Icon icon="fluent:delete-24-regular" width="24" />
            </div>
            <div className={classes.actions__view}>
              <Link to={`/onboarding/view/${item.parishId}`}>
                <Icon icon="ic:baseline-remove-red-eye" width="24"/>
              </Link>
            </div>
            <div className={classes.actions__edit}>
              <Link to={`/onboarding/edit/${item.parishId}`}>
                <Icon icon="fluent:edit-16-regular" width="24" />
              </Link>
            </div>
          </div>
        </td>

      </tr>
    );
  }

  function biometricTableBody(biometricItem, index) {
    return (
      <tr key={index}>
        <td>{index}</td>
        <td className={classes.product_name}>{biometricItem.productName}</td>
        <td>{biometricItem.serialNumber}</td>
        <td>{biometricItem.deviceId}</td>
        {/* Add more fields specific to biometric data */}
      </tr>
    );
  }

  const initDataShow = () => {
    return props.limit && props.bodyData ? props.bodyData.slice(0, Number(props.limit)) : props.bodyData;
  };

  const [dataShow, setDataShow] = useState(initDataShow);

  let pages = 1;
  let range = [];

  if (props.limit !== undefined) {
    let page = Math.floor(props.bodyData.length / Number(props.limit));
    pages = props.bodyData.length % Number(props.limit) === 0 ? page : page + 1;
    range = [...Array(pages).keys()];
  }

  const [currPage, setCurrPage] = useState(0);

  const selectPage = (page) => {
    const start = Number(props.limit) * page;
    const end = start + Number(props.limit);

    setDataShow(props.bodyData?.slice(start, end));
    setCurrPage(page);
  };

  return (
    <>
      {showModal && (
        <Modal
          title={"deleteCustomer"}
          message={`${"modalMessage"}`}
          onConfirm={showModalHandler}
        />
      )}
      <div className={classes.container}>
        <Card>
          <div className={classes.wrapper}>
            <div className={classes.table__wrapper}>
              <table className={props.limit ? classes.largeTable : classes.table}>
                {props.headData && (
                  <thead>
                    <tr>
                      {props.headData.map((item, index) => (
                        <th key={index}>{item}</th>
                      ))}
                    </tr>
                  </thead>
                )}
                <tbody>
                  {props.dataType === "biometric"
                    ? dataShow.map((item, index) => biometricTableBody(item, index))
                    : dataShow.map((item, index) => tableBody(item, index))}
                </tbody>
              </table>
            </div>
            {pages > 1 && (
              <div className={classes.table__pagination}>
                {range.map((item, index) => (
                  <div
                    key={index}
                    className={`${classes.table__pagination_item} ${
                      currPage === index ? classes.active : ""
                    }`}
                    onClick={() => selectPage(index)}
                  >
                    {item + 1}
                  </div>
                ))}
              </div>
            )}
          </div>
        </Card>
      </div>
    </>
  );
};

export default CustomTable;
