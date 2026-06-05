import { render } from '@testing-library/react';
import {
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  BodyXl,
  BodyLg,
  BodyMd,
  Body,
  BodySm,
  BodyXs,
  Interface2Xl,
  InterfaceXl,
  InterfaceLg,
  InterfaceMd,
  Interface,
  InterfaceSm,
} from './typography-components';

describe('Typography', () => {
  it('should add add correct styling for heading types', async () => {
    const { baseElement } = await render(
      <div>
        <Heading1>Heading 1</Heading1>
        <Heading2>Heading 2</Heading2>
        <Heading3>Heading 3</Heading3>
        <Heading4>Heading 4</Heading4>
        <Heading5>Heading 5</Heading5>
        <Heading6>Heading 6</Heading6>
      </div>
    );

    expect(baseElement).toMatchSnapshot();
  });

  it('should add add correct styling for body types', async () => {
    const { baseElement } = await render(
      <div>
        <BodyXl>Body Xl</BodyXl>
        <BodyLg>Body Lg</BodyLg>
        <BodyMd>Body Md</BodyMd>
        <Body>Body</Body>
        <BodySm>Body Sm</BodySm>
        <BodyXs>Body Xs</BodyXs>
      </div>
    );

    expect(baseElement).toMatchSnapshot();
  });

  it('should add add correct styling for interface types', async () => {
    const { baseElement } = await render(
      <div>
        <Interface2Xl>Interface 2Xl</Interface2Xl>
        <InterfaceXl>Interface Xl</InterfaceXl>
        <InterfaceLg>Interface Lg</InterfaceLg>
        <InterfaceMd>Interface Md</InterfaceMd>
        <Interface>Interface</Interface>
        <InterfaceSm>Interface Sm</InterfaceSm>
      </div>
    );

    expect(baseElement).toMatchSnapshot();
  });
});
