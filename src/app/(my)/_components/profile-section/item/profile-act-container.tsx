import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";

import Column from "@/components/common/container/column";
import Body from "@/components/text/body";
import { PROFILE_ACT_ITEMS } from "./profile-act-item";
import UpdateTagModal from "./update-tag-modal";
import { ChevronRight } from "lucide-react";
import Row from "@/components/common/container/row";

const ProfileActContainer = () => {
  const navigate = useNavigate();
  const [openTagModal, setOpenTagModal] = useState(false);

  const handleClick = (key: "PLAN" | "MYTAG") => {
    if (key === "PLAN") {
      navigate({ to: "/my/plan" });
      return;
    }

    if (key === "MYTAG") {
      setOpenTagModal(true);
    }
  };

  return (
    <>
      <Column className="gap-3 w-85">
        {PROFILE_ACT_ITEMS.map((item) => (
          <div
            key={item.key}
            onClick={() => handleClick(item.key)}
            className="cursor-pointer border border-primary
              rounded-2xl px-4 py-3 transition-colors hover:bg-gray-50
            "
          >
            <Row className="items-center gap-3">
              <Row className="w-10 h-10 bg-gray-100 rounded-xl items-center justify-center shrink-0">
                <div className="scale-[0.5]">{item.icon}</div>
              </Row>

              <Column className="flex-1 min-w-0 gap-0.5">
                <Body
                  variant="body2"
                  className="font-semibold fc-gray-700 truncate"
                >
                  {item.act}
                </Body>

                {item.description && (
                  <Body variant="body3" className="fc-gray-500 truncate">
                    {item.description}
                  </Body>
                )}
              </Column>

              <ChevronRight className="size-4 text-gray-400 shrink-0" />
            </Row>
          </div>
        ))}
      </Column>

      <UpdateTagModal open={openTagModal} onOpenChange={setOpenTagModal} />
    </>
  );
};

export default ProfileActContainer;
