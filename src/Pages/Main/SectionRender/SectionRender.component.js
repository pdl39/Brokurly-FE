import React, { Component } from "react";
import { Link } from "react-router-dom";
import SpecialProductsSet from "../SetComponents/SpecialProductsSet/SpecialProductsSet.component";
import EventsSet from "../SetComponents/EventsSet/EventsSet.component";
import MDRecommend from "../SetComponents/MDRecommend/MDRecommend.component";
import "./SectionRender.styles.scss";

class SectionRender extends Component {
  render() {
    const { section } = this.props;
    return (
      <div
        className={
          section.componentType === "md"
            ? "SectionRender md"
            : section.componentType === "events" ||
              section.componentType === "recipe"
            ? "SectionRender other"
            : "SectionRender products"
        }
      >
        <Link
          className={section.isLinkToAvailable ? "Link" : "Link null"}
          to={section.isLinkToAvailable ? section.linkTo : ""}
        >
          <h2 className={"special-section-heading " + section.description}>
            {section.title}
            <div
              className={
                section.isLinkToAvailable
                  ? "right-angle-icon"
                  : "right-angle-icon hide"
              }
            ></div>
          </h2>
          <p
            className={
              section.subtitle.length > 0
                ? "special-section-subtitle"
                : "special-section-subtitle hide"
            }
          >
            {section.subtitle}
          </p>
        </Link>
        {section.componentType === "products" && (
          <SpecialProductsSet categoryId={1} key={1} />
        )}
        {section.componentType === "events" && (
          <EventsSet type={section.componentType} key={section.componentType} />
        )}
        {section.componentType === "recipe" && (
          <EventsSet type={section.componentType} key={section.componentType} />
        )}
        {section.componentType === "md" && <MDRecommend />}
      </div>
    );
  }
}

export default SectionRender;
