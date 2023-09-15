import React, { FC } from "react";
import cn from "classnames";


const LoadingSkeleton = ({ className, width, height, count = 1 }) => {
    const skeletons = new Array(count).fill(null).map((_, i) => (
        <span
            key={i}
            style={{ width: width || "100%", height: height || "auto" }}
            className={cn(
                "animate-pulse bg-gray-100 dark:bg-gray-600 rounded inline-block",
                {
                    "mb-2": count > 1 && i !== count - 1,
                },
                className
            )}
        >
            &nbsp;
        </span>
    ));

    return <>{skeletons}</>;
};

export default React.memo(LoadingSkeleton);
