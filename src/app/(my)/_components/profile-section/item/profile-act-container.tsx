import Column from "@/components/common/container/column";
import { PROFILE_ACT_ITEMS } from "./profile-act-item";
import Body from "@/components/text/body";

const ProfileActContainer = () => {
  return (
    <Column className="gap-5 w-85">
      <Column className="w-full border border-primary grid grid-cols-2 rounded-2xl py-3">
        {PROFILE_ACT_ITEMS.map((item) => (
          <Column
            key={item.key}
            className="w-full items-center justify-center gap-3 my-4"
          >
            <div className="w-21 h-21 bg-gray-100 rounded-4xl flex items-center justify-center">
              {item.icon}
            </div>
            <Body variant="body2" className="font-semibold fc-gray-700 ">
              {item.act}
            </Body>
          </Column>
        ))}
      </Column>
    </Column>
  );
};

export default ProfileActContainer;
