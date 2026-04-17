"use client";

import { Box, Typography } from "@mui/material";
import {
  CATEGORY_TABS,
  getStatusBackgroundColor,
  ItemsClientProps,
  getStatusCursor,
  getStatusText,
  getStatusTextColor,
} from "./types";
import {
  ImageArea,
  ImageWrapper,
  ItemName,
  ItemWrapper,
  LockedImageWrapper,
  RequiredLevelChip,
  StatusChip,
  Tab,
  TabsWrapper,
  Wrapper,
} from "./styles";

import Image from "next/image";
import type { PoorItemCategory } from "@repo/shared";
import { colors } from "@/styles/theme/tokens/color";
import { useState } from "react";

export const ItemsGroup = ({ items, poorLevel }: ItemsClientProps) => {
  const [selectedCategory, setSelectedCategory] =
    useState<PoorItemCategory>("clothes");

  const filteredItems = items
    .filter((item) => item.category === selectedCategory)
    .sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <Wrapper>
      <TabsWrapper>
        {CATEGORY_TABS.map((tab) => {
          const isSelected = tab.value === selectedCategory;

          return (
            <Tab
              key={tab.value}
              onClick={() => setSelectedCategory(tab.value)}
              isSelected={isSelected}
            >
              <Typography
                variant="body2"
                fontWeight={isSelected ? 700 : 400}
                color={isSelected ? colors.primary.main : "#949494"}
              >
                {tab.label}
              </Typography>
            </Tab>
          );
        })}
      </TabsWrapper>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
          gap: "16px",
        }}
      >
        {filteredItems.map((item) => (
          <ItemWrapper key={item.id}>
            {(() => {
              const isLocked = item.requiredLevel > poorLevel;

              return (
                <>
                  <ImageWrapper>
                    {isLocked && (
                      <LockedImageWrapper>
                        <RequiredLevelChip>
                          <Typography
                            variant="body2"
                            color={colors.primary.l[700]}
                            fontWeight={700}
                            textAlign={"center"}
                          >
                            Lv. {item.requiredLevel}
                            <br />
                            개방
                          </Typography>
                        </RequiredLevelChip>
                      </LockedImageWrapper>
                    )}
                    <ImageArea
                      sx={{
                        filter: isLocked ? "blur(4px)" : "none",
                        opacity: isLocked ? 0.45 : 1,
                        transition: "filter 0.2s ease, opacity 0.2s ease",
                      }}
                    >
                      {item.imgUrl ? (
                        <Image
                          src={item.imgUrl}
                          alt={item.name}
                          width={88}
                          height={88}
                          style={{
                            objectFit: "contain",
                            width: "auto",
                            maxWidth: "100%",
                            maxHeight: "88px",
                          }}
                        />
                      ) : (
                        <Typography variant="body2" color={colors.gray[400]}>
                          이미지 없음
                        </Typography>
                      )}
                    </ImageArea>

                    <ItemName>
                      <Typography
                        variant="body2"
                        fontWeight={700}
                        sx={{
                          textAlign: "center",
                          wordBreak: "keep-all",
                          overflowWrap: "normal",
                          color: isLocked ? colors.white : colors.black,
                          opacity: isLocked ? 0.96 : 1,
                          textShadow: isLocked
                            ? "0px 4px 14px rgba(20, 48, 92, 0.45)"
                            : "none",
                          filter: isLocked ? "blur(0.4px)" : "none",
                        }}
                      >
                        {item.name}
                      </Typography>
                    </ItemName>
                  </ImageWrapper>

                  <StatusChip
                    sx={{
                      backgroundColor: getStatusBackgroundColor(item, isLocked),
                      cursor: getStatusCursor(item, isLocked),
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        color: getStatusTextColor(item, isLocked),
                        fontWeight: 700,
                      }}
                    >
                      {getStatusText(item)}
                    </Typography>
                  </StatusChip>
                </>
              );
            })()}
          </ItemWrapper>
        ))}
      </Box>

      {filteredItems.length === 0 ? (
        <Typography
          variant="body2"
          color={colors.gray[400]}
          sx={{ textAlign: "center", py: "24px" }}
        >
          아직 등록된 아이템이 없어요.
        </Typography>
      ) : null}
    </Wrapper>
  );
};
