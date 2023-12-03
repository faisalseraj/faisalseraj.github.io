import { Col, Row } from 'react-grid-system';

import { GridContainer } from '@/components/GridContainer';

type ContentWithSidebarProps = {
  sidebarContent: React.ReactNode;
  children?: React.ReactNode;
};

export const ContentWithSidebar = ({
  children,
  sidebarContent
}: ContentWithSidebarProps) => {
  return (
    <GridContainer>
      <Row>
        <Col md={4} push={{ md: 8 }}>
          {sidebarContent}
        </Col>

        <Col md={8} pull={{ md: 4 }}>
          {children}
        </Col>
      </Row>
    </GridContainer>
  );
};
