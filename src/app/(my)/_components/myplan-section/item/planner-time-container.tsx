import Column from "@/components/common/container/column"
import Row from "@/components/common/container/row";
import Body from "@/components/text/body";

const TimeContainer = () => {
    return(
        <Column className="w-fit">
            {Array.from({ length: 15 }).map((_, i) => (
                <Row
                  key={i}
                  className="h-11 w-11 border-b border-r justify-center pt-1"
                >
                    <Body variant="body3" className="fc-gray-500"> {8+i}:00  </Body>
                </Row>
            ))}
        </Column>
    );
};

export default TimeContainer;