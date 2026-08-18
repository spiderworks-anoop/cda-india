const DecayCard = ({ width = 300, height = 400, image = 'https://picsum.photos/300/400?grayscale', children }) => {
  return (
    <div className="content" style={{ width: `${width}px`, height: `${height}px` }}>
      <svg
        viewBox="-60 -75 720 900"
        preserveAspectRatio="xMidYMid slice"
        className="svg"
      >
        <g>
          <image
            href={image}
            x="0"
            y="0"
            width="600"
            height="700"
            preserveAspectRatio="xMidYMid slice"
            className="w-[710px]"
          />
        </g>
      </svg>
      <div className="card-text">
        {children}
      </div>
    </div>
  );
};

export default DecayCard;
