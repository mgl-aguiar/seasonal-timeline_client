import { Link } from "react-router-dom";
import { useRef, useEffect, useState } from "react";

export default function ProduceBar(props) {
  const yearOverlap = props.produce.seasonStart > props.produce.seasonEnd;

  const imgRef = useRef();
  const [imgOffset, setImgOffset] = useState(0);
  const [imgLoad, setImgLoad] = useState(false);

  useEffect(() => {
    if (!imgRef) return;
    const bbox = imgRef.current.getBBox(); // sometimes imgRef.current is returning null
    setImgOffset(bbox.width / 2);
  }, [imgRef, imgLoad]);

  return (
    <>
      {/* PRODUCES THAT DO NOT OVERLAP YEAR */}
      <div
        className="produceGridItem"
        style={{
          gridColumnStart: `${yearOverlap ? 1 : props.produce.seasonStart}`,
          gridColumnEnd: `${props.produce.seasonEnd + 1}`,
          gridRowStart: `${props.index + 1}`,
          gridRowEnd: `${props.index + 1}`,
        }}
      >
        <svg width="100%" height="60px">
          <line
            x1="0"
            y1="50%"
            x2="100%"
            y2="50%"
            stroke="grey"
            strokeWidth="0.5"
          />
          <defs>
            <clipPath id={`circleView_${props.index}`}>
              <circle cx="50%" cy="50%" r="25px" />
            </clipPath>
          </defs>
          <Link to={`/produce/${props.produce.id}`}>
            <g clipPath={`url(#circleView_${props.index})`}>
              <image
                id="imgEl"
                x="50%"
                transform={`translate (-${imgOffset} 0)`}
                alt={props.produce.name}
                xlinkHref={props.produce.imageUrl}
                ref={imgRef}
                style={{
                  height: "100%",
                }}
                onLoad={() => setImgLoad(true)}
              />
            </g>
          </Link>
          {yearOverlap ? null : (
            <circle
              cx="0"
              cy="50%"
              r="3px"
              fill="grey"
              transform="translate (3 0)"
            />
          )}
          <circle
            cx="100%"
            cy="50%"
            r="3px"
            fill="grey"
            transform="translate (-3 0)"
          />
        </svg>

        <Link to={`/produce/${props.produce.id}`}>
          <p>{props.produce.name}</p>
        </Link>
      </div>

      {/* PRODUCES THAT OVERLAP YEAR */}
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
          <svg width="100%" height="60px">
            <line
              x1="0"
              y1="50%"
              x2="100%"
              y2="50%"
              stroke="grey"
              strokeWidth="0.5"
            />
            <defs>
              <clipPath id={`circleView_right_${props.index}`}>
                <circle cx="50%" cy="50%" r="25px" />
              </clipPath>
            </defs>
            <Link to={`/produce/${props.produce.id}`}>
              <g clipPath={`url(#circleView_right_${props.index})`}>
                <image
                  id="imgEl"
                  x="50%"
                  transform={`translate (-${imgOffset} 0)`}
                  alt={props.produce.name}
                  xlinkHref={props.produce.imageUrl}
                  ref={imgRef}
                  style={{
                    height: "100%",
                  }}
                  onLoad={() => setImgLoad(true)}
                />
              </g>
            </Link>

            <circle
              cx="0"
              cy="50%"
              r="3px"
              fill="grey"
              transform="translate (3 0)"
            />

            {yearOverlap ? null : (
              <circle
                cx="100%"
                cy="50%"
                r="3px"
                fill="grey"
                transform="translate (-3 0)"
              />
            )}
          </svg>
          <Link to={`/produce/${props.produce.id}`}>
            <p>{props.produce.name}</p>
          </Link>
        </div>
      ) : null}
    </>
  );
}
