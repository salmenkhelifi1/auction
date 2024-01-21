import React, { useEffect, useState } from "react";
import "./style/itemSidebar.css";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaHammer } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { RiAccountPinCircleFill } from "react-icons/ri";
import Link from "next/link";
import axios from "axios";
import Pagination from "./Pagination";
// const ItemSidebar = ({ items }) => {
//   const [data, setData] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [index, setIndex] = useState(1);

//   const handlePageChange = (newPage) => {
//     setCurrentPage(newPage);
//   };

//   useEffect(() => {
//     fetch(`http://localhost:5000/items/fetch-items/?page=${currentPage}`)
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//         return response.json();
//       })
//       .then((responseData) => {
//         console.log("API Response:", responseData);
//         setData(responseData);
//         setTotalPages(responseData.totalPages || 1);
//       })
//       .catch((error) => console.error("Error fetching data:", error));
//   }, [currentPage]);

//   const handleLoadMore = () => {
//     setCurrentPage((prevPage) => prevPage + 1);
//   };

//   const handleIndexClick = (newIndex) => {
//     setIndex(newIndex);
//     handleLoadMore();
//   };

//   return (
//     <>
//       <div>
//         <div>
//           {items.length > 0 ? (
//             items.map((item) => (
//               <div
//                 key={item.id}
//                 className="max-w-sm border border-black-200 rounded-lg p-4 drop-shadow-lg bg-white rounded-b-lg z-15"
//               >
//                 <span className="flex m-4 ">
//                   <Image
//                     className="rounded-full "
//                     src="https://autobid.modeltheme.com/wp-content/uploads/2023/11/autobid-vehicle-13-768x486.jpg"
//                     alt="product"
//                     width={70}
//                     height={70}
//                   />
//                   <h2 className="font-bold pl-3">{item.seller?.name}</h2>
//                 </span>
//                 <p>
//                   <FaLocationDot className="black-icon w-[15px] inline-block mx-2 " />
//                   {item.seller?.address}
//                 </p>
//                 <p className="mb-3">
//                   <RiAccountPinCircleFill className="black-icon w-[15px] inline-block mx-2" />
//                   <Link
//                     href="/seller/profile/"
//                     as={`/seller/profile/${item.seller?.id}`}
//                   >
//                     Check more offers from this vendor.
//                   </Link>
//                 </p>

//                 <div className="bid flex justify-center flex-wrap ml-px">
//                   <button className="w-80 m-px  bg-red-500 text-white text-sm leading-6 font-bold py-2 px-4 rounded-lg hover:bg-red-700">
//                     <MdMessage className="black-icon w-[20px] inline-block  mx-1" />
//                     Send Message
//                   </button>

//                   <button
//                     className="w-80 m-px    text-sm leading-6 font-bold py-2 px-4 rounded-lg   text-white  mt-[1%] bg-red-500  h-[43px] float-right hover:text-black hover:bg-white
//               hover:border-[2px] hover:border-black
//               hover:h-[47px] hover:transition ease-in-out delay-50 "
//                   >
//                     <FaPhoneAlt className="black-icon h-4 w-4 inline-block mx-1" />

//                     <Link href={`tel:${item.seller.telNumb}`}>Call Vendor</Link>
//                   </button>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p>No data available</p>
//           )}
//         </div>
//         <div className="flex flex-wrap mt-3 max-w-[400px]">
//           {data &&
//             data.map((el) => (
//               <div className="flex flex-wrap mt-3" key={el.id}>
//                 <div className="sadContainer rounded-b-lg">
//                   <div
//                     className="w-178 h-100 rounded-t-lg"
//                     style={{
//                       backgroundImage: `url(${el.images[0]})`,
//                       backgroundSize: "cover",
//                     }}
//                   >
//                     <Link href={`/item/${el.id}`}>
//                       <button className="bidIcon font-bold object-center text-white text-sm leading-6 py-2 px-4 rounded-lg hover:bg-red-700">
//                         <FaHammer
//                           size={20}
//                           className="text-white cursor-pointer"
//                         />
//                       </button>
//                     </Link>
//                   </div>

//                   <h1 className="name font-bold object-center mb-3 ">
//                     26 days
//                   </h1>

//                   <div className="font-semibold text-sm/[30px] border border-black-200 rounded-sm p-4 drop-shadow-lg bg-white rounded-b-lg">
//                     <p>{el.name}</p>
//                     <p> {el.short_description}</p>
//                     <p>494 cm3 · Hybrid</p>
//                     <p className="text-black">
//                       Current Bid: €{" "}
//                       <span className="text-red-500">{el.price}</span>
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//         </div>

//         {data.length > 0 && <button onClick={handleLoadMore}>Load More</button>}
//         {totalPages > 1 && (
//           <div>
//             {Array.from({ length: totalPages }, (_, page) => (
//               <button
//                 key={page + 1}
//                 onClick={() => handlePageChange(page + 1)}
//                 className={page + 1 === currentPage ? "active" : ""}
//               >
//                 {page + 1}
//               </button>
//             ))}
//           </div>
//         )}
//       </div>
//       <div>
//         <div className="flex gap-[2%] mb-[30px]">
//           {index > 1 && (
//             <div
//               onClick={() => handleIndexClick(index - 1)}
//               className="w-[50px] h-[50px] rotate-180 bg-white rounded flex justify-center items-center cursor-pointer hover:text-white hover:bg-[#ff2800] transition-all"
//             >
//               →
//             </div>
//           )}
//           {Array.from(
//             { length: totalPages > 4 ? 4 : totalPages },
//             (_, newIndex) => (
//               <div
//                 key={newIndex + 1}
//                 onClick={() => handleIndexClick(newIndex + 1)}
//                 style={{
//                   color: index === newIndex + 1 ? "white" : "black",
//                   backgroundColor: index === newIndex + 1 ? "#ff2800" : "white",
//                 }}
//                 className="shadow-2xl w-[50px] h-[50px] text-white bg-[#ff2800] rounded flex justify-center items-center cursor-pointer"
//               >
//                 {newIndex + 1}
//               </div>
//             )
//           )}
//           {index < totalPages && (
//             <div
//               onClick={() => handleIndexClick(index + 1)}
//               className="w-[50px] h-[50px] bg-white rounded flex justify-center items-center cursor-pointer hover:text-white hover:bg-[#ff2800] transition-all"
//             >
//               →
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default ItemSidebar;
import ReactPaginate from "react-paginate";
const ItemSidebar = ({ items }) => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [index, setIndex] = useState(1);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage + 1);
  };

  useEffect(() => {
    fetch(`http://localhost:5000/items/fetch-items/?page=${currentPage}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((responseData) => {
        console.log("API Response:", responseData);
        setData(responseData);
        setTotalPages(responseData.totalPages || 1);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [currentPage]);

  const handleLoadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handleIndexClick = (newIndex) => {
    setIndex(newIndex);
    handleLoadMore();
  };

  return (
    <>
      <div>
        <div>
          {items.length > 0 ? (
            items.map((item) => (
              <div
                key={item.id}
                className="max-w-sm border border-black-200 rounded-lg p-4 drop-shadow-lg bg-white rounded-b-lg z-15"
              >
                <span className="flex m-4 ">
                  <Image
                    className="rounded-full "
                    src="https://autobid.modeltheme.com/wp-content/uploads/2023/11/autobid-vehicle-13-768x486.jpg"
                    alt="product"
                    width={70}
                    height={70}
                  />
                  <h2 className="font-bold pl-3">{item.seller?.name}</h2>
                </span>
                <p>
                  <FaLocationDot className="black-icon w-[15px] inline-block mx-2 " />
                  {item.seller?.address}
                </p>
                <p className="mb-3">
                  <RiAccountPinCircleFill className="black-icon w-[15px] inline-block mx-2" />
                  <Link
                    href="/seller/profile/"
                    as={`/seller/profile/${item.seller?.id}`}
                  >
                    Check more offers from this vendor.
                  </Link>
                </p>

                <div className="bid flex justify-center flex-wrap ml-px">
                  <button className="w-80 m-px  bg-red-500 text-white text-sm leading-6 font-bold py-2 px-4 rounded-lg hover:bg-red-700">
                    <MdMessage className="black-icon w-[20px] inline-block  mx-1" />
                    Send Message
                  </button>

                  <button
                    className="w-80 m-px    text-sm leading-6 font-bold py-2 px-4 rounded-lg   text-white  mt-[1%] bg-red-500  h-[43px] float-right hover:text-black hover:bg-white
              hover:border-[2px] hover:border-black 
              hover:h-[47px] hover:transition ease-in-out delay-50 "
                  >
                    <FaPhoneAlt className="black-icon h-4 w-4 inline-block mx-1" />

                    <Link href={`tel:${item.seller.telNumb}`}>Call Vendor</Link>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No data available</p>
          )}
        </div>
        <div className="flex flex-wrap mt-3 max-w-[400px]">
          {data &&
            data.map((el) => (
              <div className="flex flex-wrap mt-3" key={el.id}>
                <div className="sadContainer rounded-b-lg">
                  <div
                    className="w-178 h-100 rounded-t-lg"
                    style={{
                      backgroundImage: `url(${el.images[0]})`,
                      backgroundSize: "cover",
                    }}
                  >
                    <Link href={`/item/${el.id}`}>
                      <button className="bidIcon font-bold object-center text-white text-sm leading-6 py-2 px-4 rounded-lg hover:bg-red-700">
                        <FaHammer
                          size={20}
                          className="text-white cursor-pointer"
                        />
                      </button>
                    </Link>
                  </div>

                  <h1 className="name font-bold object-center mb-3 ">
                    26 days
                  </h1>

                  <div className="font-semibold text-sm/[30px] border border-black-200 rounded-sm p-4 drop-shadow-lg bg-white rounded-b-lg">
                    <p>{el.name}</p>
                    <p> {el.short_description}</p>
                    <p>494 cm3 · Hybrid</p>
                    <p className="text-black">
                      Current Bid: €{" "}
                      <span className="text-red-500">{el.price}</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {data.length > 0 && (
          <ReactPaginate
            pageCount={totalPages}
            pageRangeDisplayed={4}
            marginPagesDisplayed={2}
            onPageChange={(selectedPage) =>
              handlePageChange(selectedPage.selected)
            }
            containerClassName="pagination"
            activeClassName="active"
          />
        )}
      </div>
      <div>
        {data.length > 0 && (
          <Pagination
            pageCount={totalPages}
            onPageChange={(selectedPage) =>
              handlePageChange(selectedPage.selected)
            }
          />
        )}
      </div>
    </>
  );
};

export default ItemSidebar;
