import { Link } from "react-router-dom";
import { useRef, useEffect, useState } from "react";

export default function ProduceBar(props) {
  const yearOverlap = props.produce.seasonStart > props.produce.seasonEnd;

  // This is a nice hook we can use to get 'raw' svg/html object to use stuff like .getBBox on them!
  const imgRef = useRef();
  // Here we store the offset
  const [imgOffset, setImgOffset] = useState(0);
  const [imgLoad, setImgLoad] = useState(false); // I need to respond to the loading of the image so I keep track in it here
  useEffect(() => {
    //getBBox returns the bounding box of this image, use it to get (half) the width
    if (!imgRef) return;
    const bbox = imgRef.current.getBBox();
    setImgOffset(bbox.width / 2);
  }, [imgRef, imgLoad]);

  return (
    <>
      <div
        className="produceGridItem"
        style={{
          gridColumnStart: `${yearOverlap ? 1 : props.produce.seasonStart}`,
          gridColumnEnd: `${props.produce.seasonEnd + 1}`,
          gridRowStart: `${props.index + 1}`,
          gridRowEnd: `${props.index + 1}`,
        }}
      >
        <svg width="100%" height="100%">
          <line
            x1="0"
            y1="50%"
            x2="100%"
            y2="50%"
            stroke="grey"
            strokeWidth="0.5"
          />
          <defs>
            {/* We have to give every image it's own clippath */}
            <clipPath id={`circleView_${props.index}`}>
              <circle cx="50%" cy="50%" r="25px" />
            </clipPath>
          </defs>
          {/* We use the clipPath on the group to allow for transforms */}
          <g clipPath={`url(#circleView_${props.index})`}>
            <image
              id="imgEl"
              x="50%"
              transform={`translate (-${imgOffset} 0)`} // This centers the images (pushes them left half their width)
              alt={props.produce.name}
              xlinkHref={props.produce.imageUrl}
              ref={imgRef}
              style={{
                height: "100%",
              }}
              onLoad={() => setImgLoad(true)}
            />
          </g>
          {yearOverlap ? null : <circle cx="0" cy="50%" r="3px" fill="grey" />}
          <circle cx="100%" cy="50%" r="3px" fill="grey" />
        </svg>

        <Link to={`/produce/${props.produce.id}`}>
          <p>{props.produce.name}</p>
        </Link>
      </div>

      {yearOverlap ? (
        <div
          className="produceGridItem"
          style={{
            gridColumnStart: `${props.produce.seasonStart}`,
            gridColumnEnd: 25,
            gridRowStart: `${props.index + 1}`,
            gridRowEnd: `${props.index + 1}`,
          }}
        >
          <svg width="100%" height="100%">
            <line
              x1="0"
              y1="50%"
              x2="100%"
              y2="50%"
              stroke="grey"
              strokeWidth="0.5"
            />
            <defs>
              {/* We have to give every image it's own clippath */}
              <clipPath id={`circleView_${props.index}`}>
                <circle cx="50%" cy="50%" r="25px" />
              </clipPath>
            </defs>
            {/* We use the clipPath on the group to allow for transforms */}
            <g clipPath={`url(#circleView_${props.index})`}>
              <image
                id="imgEl"
                x="50%"
                transform={`translate (-${imgOffset} 0)`} // This centers the images (pushes them left half their width)
                alt={props.produce.name}
                xlinkHref={props.produce.imageUrl}
                ref={imgRef}
                style={{
                  height: "100%",
                }}
                onLoad={() => setImgLoad(true)}
              />
            </g>

            {/* circle at the start of the line */}
            <circle cx="0" cy="50%" r="3px" fill="grey" />

            {yearOverlap ? null : (
              <circle cx="100%" cy="50%" r="3px" fill="grey" />
            )}
          </svg>
          <Link to={`/produce/${props.produce.id}`}>{props.produce.name}</Link>
        </div>
      ) : null}
    </>
  );
}
