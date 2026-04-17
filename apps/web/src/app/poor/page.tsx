import { GoItemButton, PoorContainer, ProfileWrapper } from "./styles";
import { IconButton, Typography } from "@mui/material";

import { PoorItemCategory, PoorOverviewResponse } from "@repo/shared";
import EditIcon from "@mui/icons-material/Edit";
import Image from "next/image";
import Link from "next/link";
import PageContainer from "@/shared/ui/layout/PageContainer";
import PageHeader from "@/shared/ui/layout/PageHeader";
import { colors } from "@/styles/theme/tokens/color";
import { fetchApi } from "@/shared/lib/fetchApi";
import { redirect } from "next/navigation";

const getPoorImageSrc = (level: number) => {
  if (level >= 6) {
    return "/images/poor/poor-high.svg";
  }

  if (level === 5) {
    return "/images/poor/poor-mid.svg";
  }

  return "/images/poor/poor-low.svg";
};

const EQUIPPED_ITEM_LAYER_ORDER: Record<PoorItemCategory, number> = {
  setup: 10,
  pants: 20,
  clothes: 30,
  shoes: 40,
  accessory: 50,
  hair: 60,
  face: 70,
};

export default async function PoorPage() {
  const poor = await fetchApi<PoorOverviewResponse>({ path: "/poor" });

  if (!poor) {
    redirect("/sign-in");
  }

  const { user, equippedItems } = poor;
  const sortedEquippedItems = [...equippedItems].sort(
    (left, right) =>
      EQUIPPED_ITEM_LAYER_ORDER[left.category] -
      EQUIPPED_ITEM_LAYER_ORDER[right.category],
  );

  return (
    <PageContainer
      sx={{ justifyContent: "space-between", alignItems: "center" }}
    >
      <PageHeader title="푸어 키우기" referenceUrl="/main" />

      <PoorContainer>
        <Image
          src={getPoorImageSrc(user.level)}
          alt="Poor"
          width={122}
          height={225}
        />
        {sortedEquippedItems.map((item) =>
          item.imgUrl ? (
            <Image
              key={item.id}
              src={item.imgUrl}
              alt={item.name}
              width={122}
              height={225}
              style={{
                position: "absolute",
                inset: "50% auto auto 50%",
                transform: "translate(-50%, -50%)",
                objectFit: "contain",
                pointerEvents: "none",
              }}
            />
          ) : null,
        )}
        <Image
          src={`/images/level/level-${user.level}.svg`}
          alt="Poor Level"
          width={40}
          height={60}
          style={{ position: "absolute", bottom: -30 }}
        />
      </PoorContainer>

      <ProfileWrapper>
        <Typography fontWeight={700} fontSize={24}>
          {user.poorName}
        </Typography>

        <IconButton size="small">
          <EditIcon sx={{ fontSize: 18, color: colors.gray[350] }} />
        </IconButton>
      </ProfileWrapper>

      <Link href="/poor/items">
        <GoItemButton>아이템</GoItemButton>
      </Link>
    </PageContainer>
  );
}
