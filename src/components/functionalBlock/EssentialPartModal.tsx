import ComponentType from "../../types/ComponentType";
import { getDomainFromLink } from "../../util/common/getUrlDomain";
import { USDollar } from "../../util/common/stringFormatters";
import DataPoint from "../DataPoint";
import Modal from "../Modal";

interface Props {
  essentialPart: ComponentType,
  isOpen: boolean,
  setIsOpen: (x: boolean) => {} 
}

const EssentialPartModal = ({essentialPart, isOpen, setIsOpen}: Props) => {
  return ( 
    isOpen ?  
    <Modal
      handleClose={() => setIsOpen(false)}
      title={essentialPart?.genericDescription || 
        (essentialPart?.type?.includes("COMPONENT_TYPE") ? essentialPart?.type?.split("COMPONENT_TYPE_")[1] : essentialPart?.type) || 
        'Unnamed Essential Part'
      }

      body={
        <div>
          <DataPoint label="Type" data={essentialPart?.type} />
          <div>
            <DataPoint label="Cost" data={essentialPart?.cost ? USDollar.format(essentialPart.cost) : 'Not Found'} />
            {essentialPart?.purchaseUrls?.map(url => (
              <a 
                target="_blank"
                href={url}
              >
                {getDomainFromLink(url)}
              </a>
            ))}
          </div>

          <DataPoint label="Notes"> 
            {essentialPart?.notes?.length ? 
              <ul>
                {essentialPart?.notes?.map((note: string) => (
                  <li>{note}</li>
                ))}
              </ul>
            : <p>No Notes Found</p>}
          </DataPoint>

          <DataPoint label="Datasheet Links"> 
            {essentialPart?.datasheetUrls?.length ? 
              <ul>
                {essentialPart?.datasheetUrls?.map(url => (
                  <a 
                    target="_blank"
                    href={url}
                  >
                    {getDomainFromLink(url)}
                  </a>
                ))}
              </ul>
            : <p>No Links Found</p>}
          </DataPoint>

        </div>
      }

      footer={
        <button 
          className="btn secondary" 
          onClick={() => setIsOpen(false)}
        >
          Close
        </button>
      }
    />
    : null
  );
}
 
export default EssentialPartModal;