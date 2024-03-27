import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';

import assetsMetadata from '@/mock/assetsMetadata.json';
import { Diversity1Sharp } from '@mui/icons-material';

const Filters = () => {
    return (
        <>
            <List>
                <Divider />
                <Box p={3}>
                    <h4>fields - context</h4>
                    <div>
                        {Object.entries(assetsMetadata.context.schema.properties).map(([key, value]) => {
                            return (
                                <div key={key}>
                                    <p>{key}</p>

                                    {assetsMetadata.context.uiSchema[key]['ui:widget'] === 'radios' && (
                                        <div>
                                            {value.enum.map((option) => (
                                                <div key={option}>
                                                    <input type="radio" id={option} name={key} value={option} />
                                                    <label htmlFor={option}>{option}</label>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {assetsMetadata.context.uiSchema[key]['ui:widget'] === 'checkboxes' && (
                                        <div>
                                            {value.items.enum.map((option) => (
                                                <div key={option}>
                                                    <input type="checkbox" id={option} name={key} value={option} />
                                                    <label htmlFor={option}>{option}</label>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {assetsMetadata.context.uiSchema[key]['ui:widget'] === 'textarea' && (
                                        <textarea id={key} name={key} />
                                    )}

                                    {assetsMetadata.context.uiSchema[key]['ui:widget'] === 'color' && (
                                        <input type="color" id={key} name={key} />
                                    )}

                                    {assetsMetadata.context.uiSchema[key]['ui:widget'] === 'text' && (
                                        <input type="text" id={key} name={key} />
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    <Divider />

                    <h4>fields - taxonomy</h4>
                    <div>
                        {Object.entries(assetsMetadata.taxonomy.schema.properties).map(([key, value]) => {
                            return (
                                <div key={key}>
                                    <p>{key}</p>

                                    {assetsMetadata.taxonomy.uiSchema[key]['ui:widget'] === 'radios' && (
                                        <div>
                                            {value.enum.map((option) => (
                                                <div key={option}>
                                                    <input type="radio" id={option} name={key} value={option} />
                                                    <label htmlFor={option}>{option}</label>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {assetsMetadata.taxonomy.uiSchema[key]['ui:widget'] === 'checkboxes' && (
                                        <div>
                                            {value.items.enum.map((option) => (
                                                <div key={option}>
                                                    <input type="checkbox" id={option} name={key} value={option} />
                                                    <label htmlFor={option}>{option}</label>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {assetsMetadata.taxonomy.uiSchema[key]['ui:widget'] === 'textarea' && (
                                        <textarea id={key} name={key} />
                                    )}

                                    {assetsMetadata.taxonomy.uiSchema[key]['ui:widget'] === 'text' && (
                                        <input type="text" id={key} name={key} />
                                    )}
                                </div>
                            )
                        })}
                    </div>

                    <Divider />

                    <h4>fields - creators</h4>
                    <div>
                        {Object.entries(assetsMetadata.creators.schema.items.properties).map(([key, value]) => {
                            return (
                                <div key={key}>
                                    <p>{key}</p>

                                    {assetsMetadata.creators.uiSchema.items[key]['ui:widget'] === 'radios' && (
                                        <div>
                                            {value.enum.map((option) => (
                                                <div key={option}>
                                                    <input type="radio" id={option} name={key} value={option} />
                                                    <label htmlFor={option}>{option}</label>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {assetsMetadata.creators.uiSchema.items[key]['ui:widget'] === 'checkboxes' && (
                                        <div>
                                            {value.items.enum.map((option) => (
                                                <div key={option}>
                                                    <input type="checkbox" id={option} name={key} value={option} />
                                                    <label htmlFor={option}>{option}</label>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {assetsMetadata.creators.uiSchema.items[key]['ui:widget'] === 'textarea' && (
                                        <textarea id={key} name={key} />
                                    )}

                                    {assetsMetadata.creators.uiSchema.items[key]['ui:widget'] === 'text' && (
                                        <input type="text" id={key} name={key} />
                                    )}
                                </div>
                            )
                        })}
                    </div>

                    <Divider />

                    <h4>fields - provenance</h4>
                    <div>
                        {Object.entries(assetsMetadata.provenance.schema.properties).map(([key, value]) => {
                            return (
                                <div key={key}>
                                    <p>{key}</p>

                                    {assetsMetadata.provenance.uiSchema[key]['ui:widget'] === 'radios' && (
                                        <div>
                                            {value.enum.map((option) => (
                                                <div key={option}>
                                                    <input type="radio" id={option} name={key} value={option} />
                                                    <label htmlFor={option}>{option}</label>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {assetsMetadata.provenance.uiSchema[key]['ui:widget'] === 'tuple' && (
                                        <div>
                                            {Object.keys(assetsMetadata.provenance.uiSchema[key].items).map((option) => (
                                                <div key={option}>
                                                    <label htmlFor={option}>{option}</label>
                                                    <input type="text" id={option} name={option} />
                                                </div>
                                            ))}
                                            
                                        </div>
                                    )}

                                    {assetsMetadata.provenance.uiSchema[key]['ui:widget'] === 'textarea' && (
                                        <textarea id={key} name={key} />
                                    )}

                                    {assetsMetadata.provenance.uiSchema[key]['ui:widget'] === 'text' && (
                                        <input type="text" id={key} name={key} />
                                    )}
                                </div>
                            )
                        })}
                    </div>

                    <Button variant="contained" onClick={() => {}} fullWidth>
                        Reset Filters
                    </Button>
                </Box>
            </List>
        </>
    );
};

export default Filters;
