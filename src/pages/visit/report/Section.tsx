import {Text, View} from 'react-native';
import Segment from '../../../models/visit/reportStructure/segment';
import React from 'react';
import Input from './Input';
import Visit from '../../../models/visit/visit';
import VisitFieldUpdateContext from '../../../models/visit/VisitFieldUpdateContext';

const Section: React.FC<{
  section: Segment;
  visitFieldUpdateContext: VisitFieldUpdateContext;
}> = ({section, visitFieldUpdateContext}) => {
  return (
    <View style={{marginTop: 8}}>
      {section.segmentTitle && (
        <Text style={{fontWeight: 'bold', marginHorizontal: 5}}>
          {section.segmentTitle}
        </Text>
      )}
      {section.fields?.map((field, index) => {
        return (
          <Input
            field={field}
            visitFieldUpdateContext={{
              ...visitFieldUpdateContext,
              fieldIndex: index,
            }}
          />
        );
      })}
    </View>
  );
};

export default Section;
