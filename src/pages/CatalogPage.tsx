import React, { useState } from "react";
import { List, Card, Tag } from "antd-mobile";
import { useNavigate } from "react-router-dom";
import { productItems } from "../data/ProductItems.tsx";

const CatalogPage = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        padding: "16px",
      }}
    >
      <Card
        style={{
          borderRadius: "16px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <div
          style={{
            textAlign: "center",
            padding: "20px 0",
            borderBottom: "1px solid #f0f0f0",
          }}
        >
          <h2
            style={{
              margin: "0 0 12px 0",
              fontSize: "24px",
              fontWeight: "bold",
              color: "#000",
            }}
          >
            Akbota HealthBot
          </h2>
          <p
            style={{
              margin: 0,
              color: "#999",
              fontSize: "14px",
              lineHeight: "1.5",
            }}
          >
            Добро пожаловать на канал Акботы,
            <br />
            нутрициолога со стажем.
          </p>
        </div>

        <List
          style={{
            "--border-top": "none",
            "--border-bottom": "none",
            "--border-inner": "1px solid #f0f0f0",
          }}
        >
          {productItems.map((item, index) => (
            <div
              key={index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{
                backgroundColor:
                  hoveredIndex === index
                    ? item.hoverBgColor
                    : "transparent",
                borderRadius: "12px",
                margin: "4px 8px",
                transition: "background-color 0.2s ease",
              }}
            >
              <List.Item
                prefix={
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: "8px",
                      marginTop: "12px",
                      backgroundColor: item.bgColor,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {item.icon}
                  </div>
                }
                extra={
                  <Tag
                    color="#868686ff"
                    fill="outline"
                    style={{ "--border-radius": "6px", fontSize: "16px" }}
                  >
                    {item.priceName}
                  </Tag>
                }
                onClick={() => navigate(`/checkout/${item.id}`)} // <-- переход
                style={{
                  padding: "8px 8px",
                  cursor: "pointer",
                  backgroundColor: "transparent",
                }}
              >
                <div
                  style={{
                    marginTop: "12px",
                    fontSize: "16px",
                    fontWeight: "500",
                    color: "#000",
                  }}
                >
                  {item.title}
                </div>
              </List.Item>
            </div>
          ))}
        </List>

        <div
          style={{
            textAlign: "center",
            padding: "16px",
            color: "#999",
            fontSize: "13px",
          }}
        >
          Выберите гайд для перехода к опыту
        </div>
      </Card>
    </div>
  );
};

export default CatalogPage;