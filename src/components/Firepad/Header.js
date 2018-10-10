import React from 'react';
import { FormGroup, Input, Row, Col } from 'reactstrap';
import languages from './languages';

function Header({ selectedMode, changeMode }) {
  return (
    <Row className="justify-content-between">
      <Col xs="12" md="3" className="logo text-center pt-1">
        <h2 className="text-white">CoderKamp</h2>
      </Col>
      <Col xs="12" md="3" className="text-right">
        <FormGroup className="px-4 pt-1 d-flex col-xs-12" >
          <Input type="select" className="selectInput" name="language" value={selectedMode} onChange={e => changeMode(e.target.value)}>
            {languages.map(l => (
              <option key={l.value} value={l.value}>
                {l.text} 
              </option>
            ))}
          </Input>
        </FormGroup>
      </Col>
    </Row>
  );
}

export default Header;
