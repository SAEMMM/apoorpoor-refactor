"use client";

import { Box, Button, Stack, Typography } from "@mui/material";
import { useMemo, useState } from "react";

import { ExpenseSummaryItem } from "../types";
import React from "react"
import { colors } from "@/styles/theme/tokens/color";

interface DetailListProps {
  items: ExpenseSummaryItem[];
  initialVisibleCount?: number;
}

const formatAmount = (amount: number) => `${amount.toLocaleString()}원`;

export const DetailList = ({
  items,
  initialVisibleCount = 4,
}: DetailListProps) => {
  const [expanded, setExpanded] = useState(false);

  const visibleItems = useMemo(() => {
    return expanded ? items : items.slice(0, initialVisibleCount);
  }, [expanded, items, initialVisibleCount]);

  return (
    <Stack spacing={4}>
      <Stack spacing={3}>
        {visibleItems.map((item) => (
          <Box
            key={item.category}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box display="flex" alignItems="center" gap={1.5}>
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  backgroundColor: item.color,
                  flexShrink: 0,
                }}
              />

              <Box display="flex" alignItems="baseline" gap={0.5}>
                <Typography variant="body2" color={colors.black}>
                  {item.label}
                </Typography>
                <Typography variant="body2" color={colors.gray[400]}>
                  {item.percent}%
                </Typography>
              </Box>
            </Box>

            <Typography variant="body1" fontWeight={700} color={colors.black}>
              {formatAmount(item.amount)}
            </Typography>
          </Box>
        ))}
      </Stack>

      <Button
        variant="outlined"
        fullWidth
        onClick={() => setExpanded((prev) => !prev)}
        sx={{
          height: 48,
          borderRadius: "12px",
          borderColor: colors.gray[250],
        }}
      >
        <Typography variant="body2" color={colors.gray[450]}>
          {expanded ? "접기" : "더보기"}
        </Typography>
      </Button>
    </Stack>
  );
};
