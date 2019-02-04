import Month from "../Month";
import { Certificate } from "../Model";
import React from "react";
import CertificateIcon from "./CertificateIcon";
import IconHeader from "./IconHeader";
import TimelineCard from "./TimelineCard";

export default class CertificateEventFactory {
  constructor(private readonly certificates: Certificate[]) {}

  public events() {
    return this.certificates.map(c => ({
      component: () => <ItemComponent {...c} />,
      from: Month.parse(c.date.substr(0, 7)),
      key: `Certificate${c.name}`
    }));
  }
  public any() {
    return !!this.certificates.length;
  }

  public static readonly icon = CertificateIcon;
}

function ItemComponent({ date, name }: Certificate) {
  const header = (
    <IconHeader title="Certificate">
      <CertificateIcon />
    </IconHeader>
  );
  return (
    <TimelineCard header={header} from={Month.parse(date.substr(0, 7))}>
      {name}
    </TimelineCard>
  );
}
