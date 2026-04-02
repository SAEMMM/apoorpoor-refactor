"use client";

import {
  ArcElement,
  Chart,
  ChartData,
  ChartOptions,
  DoughnutController,
  Legend,
  Plugin,
  Tooltip,
} from "chart.js";
import { Bubble, ChartWrapper, TitleWrapper, Wrapper } from "./styles";
import type { BubblePosition, PieChartProps } from "./types";
import { useEffect, useMemo, useRef, useState } from "react";

import { DetailList } from "./DetailList";
import React from "react"
import { Typography } from "@mui/material";
import { colors } from "@/styles/theme/tokens/color";

Chart.register(DoughnutController, ArcElement, Tooltip, Legend);

const EMPTY_CHART_ITEMS = [
  { label: "empty-1", amount: 45, percent: 0, color: colors.primary.l[600] },
  { label: "empty-2", amount: 30, percent: 0, color: colors.gray[250] },
  { label: "empty-3", amount: 25, percent: 0, color: colors.gray[150] },
];

export const PieChart = ({
  chartItems,
  listItems,
  selectedIndex: initialSelectedIndex = 0,
}: PieChartProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartRef = useRef<Chart<"doughnut"> | null>(null);
  const [bubblePosition, setBubblePosition] = useState<BubblePosition | null>(
    null,
  );
  const [selectedIndex, setSelectedIndex] = useState(initialSelectedIndex);

  const isEmpty = chartItems.length === 0;

  const displayChartItems = useMemo(() => {
    return isEmpty ? EMPTY_CHART_ITEMS : chartItems;
  }, [chartItems, isEmpty]);

  const safeSelectedIndex = isEmpty
    ? 0
    : Math.min(selectedIndex, chartItems.length - 1);

  const selectedItem = isEmpty ? null : chartItems[safeSelectedIndex];

  useEffect(() => {
    if (!canvasRef.current) return;

    const updateBubblePosition = (chart: Chart<"doughnut">) => {
      if (isEmpty) {
        setBubblePosition(null);
        return;
      }

      const meta = chart.getDatasetMeta(0);
      const arc = meta.data[safeSelectedIndex];

      if (!arc) return;

      const props = arc.getProps(
        ["x", "y", "startAngle", "endAngle", "innerRadius"],
        true,
      );

      const midAngle = (props.startAngle + props.endAngle) / 2;
      const distance = props.innerRadius * 0.92;

      const x = props.x + Math.cos(midAngle) * distance;
      const y = props.y + Math.sin(midAngle) * distance;

      setBubblePosition({
        left: x,
        top: y,
      });
    };

    const bubblePlugin: Plugin<"doughnut"> = {
      id: "bubblePositionPlugin",
      afterRender(chart) {
        updateBubblePosition(chart);
      },
      resize(chart) {
        updateBubblePosition(chart);
      },
    };

    const data: ChartData<"doughnut"> = {
      labels: displayChartItems.map((item) => item.label),
      datasets: [
        {
          data: displayChartItems.map((item) => item.amount),
          backgroundColor: displayChartItems.map((item) => item.color),
          borderWidth: 0,
          hoverOffset: 0,
          spacing: 0,
        },
      ],
    };

    const options: ChartOptions<"doughnut"> = {
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 600,
      },
      cutout: "52%",
      onClick: (_, elements) => {
        if (isEmpty || !elements.length) return;
        setSelectedIndex(elements[0].index);
      },
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          enabled: false,
        },
      },
    };

    chartRef.current?.destroy();

    const chart = new Chart(canvasRef.current, {
      type: "doughnut",
      data,
      options,
      plugins: [bubblePlugin],
    });

    chartRef.current = chart;

    return () => {
      chart.destroy();
      chartRef.current = null;
    };
  }, [displayChartItems, safeSelectedIndex, isEmpty]);

  return (
    <Wrapper>
      <TitleWrapper>
        <Typography variant="h2">이번달 상세 지출내역</Typography>
        <Typography variant="body1">
          {isEmpty
            ? "가계부를 작성하고 상세 지출을 확인해보세요!"
            : `${selectedItem?.label}에 가장 많이 사용하셨어요.`}
        </Typography>
      </TitleWrapper>

      <ChartWrapper>
        <canvas ref={canvasRef} />

        {!isEmpty && bubblePosition && selectedItem && (
          <Bubble bubblePosition={bubblePosition}>
            <Typography variant="caption" color={colors.black}>
              {selectedItem.label}
            </Typography>

            <Typography
              variant="body1"
              fontWeight={700}
              color={selectedItem.color}
            >
              {selectedItem.percent}%
            </Typography>
          </Bubble>
        )}
      </ChartWrapper>

      {!isEmpty && <DetailList items={listItems} />}
    </Wrapper>
  );
};