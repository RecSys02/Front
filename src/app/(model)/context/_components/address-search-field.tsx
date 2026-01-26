import { useState } from "react";
import DaumPostcode, { Address } from "react-daum-postcode";
import { Button } from "@/components/common/button/button";
import { Input } from "@/components/ui/input";
import Column from "@/components/common/container/column";
import Row from "@/components/common/container/row";

type Props = {
  value: string;
  onChange: (address: string) => void;
};

const AddressSearchField = ({ value, onChange }: Props) => {
  const [open, setOpen] = useState(false);

  const handleComplete = (data: Address) => {
    const address = data.roadAddress || data.jibunAddress;
    onChange(address);
    setOpen(false);
  };

  return (
    <Column className="gap-2">
      <Row className="gap-2">
        <Input value={value} readOnly placeholder="주소를 검색해 주세요" />
        <Button
          type="button"
          variant="outline"
          className="bg-emphasis text-white"
          onClick={() => setOpen(true)}
        >
          주소 검색
        </Button>
      </Row>

      {open && (
        <>
          <div className="fixed inset-0 z-40 " onClick={() => setOpen(false)} />
          <div className="fixed left-1/2 top-1/2 z-50 w-130 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-lg border bg-white shadow-lg">
            <DaumPostcode
              onComplete={handleComplete}
              autoClose
              style={{ height: 480 }}
            />
          </div>
        </>
      )}
    </Column>
  );
};

export default AddressSearchField;
