/* eslint-disable react-hooks/exhaustive-deps */
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../config/firebase";
import Loader from "../components/Loader";
import { Balancer } from "react-wrap-balancer";
import parse from "html-react-parser";
import "react-quill/dist/quill.snow.css";

import { getAuth } from "firebase/auth";
import dayjs from "dayjs";
import LazyLoad from "../components/common/LazyLoad";

const SingleArticle = () => {
  const auth = getAuth();
  const [blogData, setBlogData] = useState();
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const { categoryName, articleId } = params;
  // console.log(auth);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const blogRef = doc(db, "blogs", articleId);
        const docSnap = await getDoc(blogRef);
        if (docSnap.exists()) {
          setBlogData({
            id: docSnap.id,
            data: docSnap.data(),
          });
        }
        setLoading(false);
        // console.log(blogData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const formattedDate = dayjs(blogData?.data?.timestamp?.toDate()).format(
    "YYYY-MM-DD"
  );
  if (loading) {
    return <Loader />;
  }

  const fallBackImage =
    "https://img.freepik.com/free-photo/digital-painting-mountain-with-colorful-tree-foreground_1340-25699.jpg?w=900&t=st=1686204841~exp=1686205441~hmac=16586e1f1340a9b9a774cd9538d3a9fc9fcd78acf00fbe2405160352f137faa4";

  const avatar =
    "https://img.freepik.com/free-vector/mysterious-mafia-man-smoking-cigarette_52683-34828.jpg?w=900&t=st=1686289808~exp=1686290408~hmac=ddf129d05139e33a919318574cf3f69182bb731b65ebb03b265448b8aef9cf77";

  return (
    <div className=' mx-auto max-w-6xl text-gray-400 prose-h1:text-indigo-500 prose-h2:py-2 prose-h2:text-2xl prose-h2:text-emerald-500 prose-h3:text-zinc-500 prose-p:font-mono prose-p:tracking-wide prose-a:text-blue-500 prose-a:underline prose-li:list-disc  prose-li:font-mono '>
      {blogData && (
        <>
          <div className='mx-auto mt-14 w-[90%] lg:w-[60%]'>
            {/* <img
              className='rounded-lg'
              src='https://img.freepik.com/free-photo/digital-painting-mountain-with-colorful-tree-foreground_1340-25699.jpg?w=900&t=st=1686204841~exp=1686205441~hmac=16586e1f1340a9b9a774cd9538d3a9fc9fcd78acf00fbe2405160352f137faa4'
              alt=''
            /> */}
            <LazyLoad
              classes={"rounded-lg"}
              image={
                blogData?.data?.imageUrl
                  ? blogData?.data?.imageUrl
                  : fallBackImage
              }
            />
            <div className='mt-5 flex items-center justify-center'>
              <img
                className='mr-3 h-10 w-10 rounded-full'
                src='https://img.freepik.com/free-vector/mysterious-mafia-man-smoking-cigarette_52683-34828.jpg?w=900&t=st=1686289808~exp=1686290408~hmac=ddf129d05139e33a919318574cf3f69182bb731b65ebb03b265448b8aef9cf77'
                alt='Rounded avatar'
              />
              <p>
                {" "}
                <i className='font-extralight text-gray-400'>
                  written by ~{" "}
                </i>{" "}
                <strong> {blogData.data.author.name} </strong> on{" "}
                <strong>{formattedDate}</strong>
              </p>
            </div>
          </div>
          <div className='mx-4'>
            <p className=' px-10 pt-10 text-white'>
              {" "}
              Tags:{" "}
              <span className='ml-3 rounded-xl  bg-emerald-600 px-4 py-2 text-white'>
                {blogData.data.blogData.category}
              </span>{" "}
            </p>
            <h1 className='mx-auto mt-12 w-full text-center text-2xl font-extrabold md:w-[90%] md:text-4xl'>
              <Balancer>{blogData.data.blogData.title}-</Balancer>
            </h1>
            <article className='space-y-3 hyphens-auto px-4 py-10 font-lexend  leading-relaxed md:px-20 '>
              <Balancer className='text-[18px] leading-7 md:text-[23px] md:leading-9 lg:leading-10 '>
                {parse(blogData?.data?.blogData?.content)}
              </Balancer>
            </article>
          </div>
        </>
      )}
    
    </div>
  );
};

export default SingleArticle;
