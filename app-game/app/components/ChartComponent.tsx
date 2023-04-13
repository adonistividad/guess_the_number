"use client";

import { FC, useEffect, useState } from "react";
// import ChatComponent from'./components/ChatComponent'
import { Line } from "react-chartjs-2";

const startPoint = 2;
const endPoint = 2.35;

const point1 = startPoint + (endPoint - startPoint) * 0.33;
const point2 = startPoint + (endPoint - startPoint) * 0.67;
console.log(">>>>>>>>>>", point1, endPoint + (5 - endPoint) * 0.33);
const sampleData = [
  startPoint,
  point1,
  endPoint,
  endPoint + (5 - endPoint) * 0.33,
];

const dataTest = {
  labels: sampleData,
  datasets: [
    {
      label: "Data Points",
      data: sampleData,
      fill: false,
      borderColor: "rgb(75, 192, 192)",
      tension: 0.4, // Set tension to create a curved line
      pointRadius: 0,
    },
  ],
};
const optionTest: any = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      beginAtZero: false,
      gridLines: {
        display: false,
      },
    },
    y: {
      beginAtZero: false,
      gridLines: {
        display: false,
      },
    },
  },
  legend: {
    display: false, //This will do the task
  },
};
const additionalLabelLength = 20;
const maxTime = 5;

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  // animation: {
  //   // duration: 1000, // set animation duration to 1000ms
  //   duration: 1000, // set animation duration to 1000ms
  //   easing: "easeInOutQuad", // set easing function for animation
  // },
  scales: {
    x: {
      beginAtZero: false,
      gridLines: {
        display: false,
      },
    },
    y: {
      beginAtZero: false,
      // max: 10,
      gridLines: {
        display: false,
      },
    },
  },
};

const ChartComponent: FC<any> = ({
  speed,
  // isStarted,
  // setIsStarted,
  isEnded,
  setIsEnded,
  datasetValues,
}) => {
  const [counter, setCounter] = useState<number>(0);
  const [currentValue, setCurrentValue] = useState<number>(0);

  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: "",
        data: [],
        fill: false,
        borderColor: "rgba(75,192,192,1)",
        lineTension: 0.4,
        pointRadius: 0, // Set point radius to 0 to hide data points
        // tension: 0.6,
        tension: 0,
      },
    ],
  });

  // const resetDdata = () => {
  //   const newData: any = {
  //     // labels: [...data.labels, " "],
  //     labels: " ",
  //     datasets: [],
  //   };
  //   setData(newData);
  // };

  useEffect(() => {
    if (datasetValues) {
      setIsEnded(false);
      setCounter(1);
    }
  }, [datasetValues]);
  useEffect(() => {
    if (!isEnded) {
      resetData();
    }
  }, [isEnded]);

  const resetData = () => {
    const newData: any = {
      labels: " ".repeat(datasetValues.length + additionalLabelLength),
      datasets: [],
    };
    setData(newData);
  };
  const updateData = () => {
    const newValue = datasetValues[counter];
    setCurrentValue(newValue);
    const newData: any = {
      labels: " ".repeat(datasetValues.length + additionalLabelLength),
      datasets: [
        {
          ...data.datasets[0],
          data: [...data.datasets[0].data, newValue],
        },
      ],
    };
    setData(newData);
  };

  useEffect(() => {
    if (counter > 0) {
      console.log("counter >>>", counter, datasetValues.length);
      const interval = setInterval(() => {
        if (counter >= datasetValues.length) {
          clearInterval(interval);
          setIsEnded(true);
          setCounter(0);
          // resetData()
        } else {
          setCounter(counter + 1);
          const newValue = datasetValues[counter];
          setCurrentValue(newValue);
          updateData();
        }
      }, 100 * (maxTime - speed + 1));

      return () => {
        clearInterval(interval);
      };
    }
  }, [counter]);

  return (
    <div className="w-full mt-5 ">
      <div className="chart-main">
        <div className="chart-value text-5xl text-red-400">
          {currentValue ? `${currentValue.toFixed(2)}x` : ""}
        </div>
        {/* <Line datasetIdKey="id" data={data} options={chartOptions} /> */}
        {counter > 0 && (
          <Line datasetIdKey="id" data={dataTest} options={optionTest} />
        )}
      </div>
    </div>
  );
};

export default ChartComponent;
