/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from "@wordpress/i18n";

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import {
  useBlockProps,
  InspectorControls,
  MediaUpload,
  MediaUploadCheck,
  __experimentalLinkControl as LinkControl,
} from "@wordpress/block-editor";

import { PanelBody, TextControl, Button, Popover } from "@wordpress/components";

import { useState } from "@wordpress/element";

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import "./editor.scss";

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit({ attributes, setAttributes }) {
  const { items } = attributes;
  const [showLinkPopover, setShowLinkPopover] = useState(null);

  const blockProps = useBlockProps({
    className: "three-col-post-categories",
  });

  const updateItems = (index, attrs) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], ...attrs };
    setAttributes({ items: newItems });
  };

  console.log(items);

  return (
    <>
      <InspectorControls>
        {items.map((item, index) => (
          <PanelBody
            key={index}
            title={__(`Item ${index + 1}`, "three-col-post-categories")}
            initialOpen={index === 0}
          >
            <TextControl
              label={__("Title", "three-col-post-categories")}
              value={item.title}
              onChange={(value) =>
                updateItems(index, {
                  title: value,
                })
              }
            />

            <MediaUploadCheck>
              <MediaUpload
                onSelect={(media) => {
                  updateItems(index, {
                    backgroundUrl: media.url,
                    backgroundId: media.id,
                  });
                }}
                allowedTypes={["image"]}
                value={item.backgroundId}
                render={({ open }) => (
                  <div style={{ marginBottom: "16px" }}>
                    <Button
                      onClick={open}
                      variant="secondary"
                      style={{ marginBottom: "8px" }}
                    >
                      {item.backgroundUrl
                        ? __(
                            "Change Background Image",
                            "three-col-post-categories"
                          )
                        : __(
                            "Select Background Image",
                            "three-col-post-categories"
                          )}
                    </Button>
                    {item.backgroundUrl && (
                      <>
                        <div style={{ marginBottom: "8px" }}>
                          <img
                            src={item.backgroundUrl}
                            alt=""
                            style={{ width: "100%", height: "auto" }}
                          />
                        </div>
                        <Button
                          onClick={() => {
                            updateItems(index, {
                              backgroundUrl: "",
                              backgroundId: 0,
                            });
                          }}
                          variant="secondary"
                          isDestructive
                        >
                          {__("Remove Image", "three-col-post-categories")}
                        </Button>
                      </>
                    )}
                  </div>
                )}
              />
            </MediaUploadCheck>

            <div>
              <Button
                variant="secondary"
                onClick={() => setShowLinkPopover(index)}
                style={{ marginBottom: "8px" }}
              >
                {item.url
                  ? __("Edit Link", "three-col-post-categories")
                  : __("Add Link", "three-col-post-categories")}
              </Button>

              {showLinkPopover === index && (
                <Popover
                  onClose={() => setShowLinkPopover(null)}
                  placement="bottom-start"
                >
                  <div style={{ padding: "16px", minWidth: "300px" }}>
                    <LinkControl
                      value={{ url: item.url }}
                      onChange={(newValue) => {
                        updateItems(index, {
                          url: newValue.url || "",
                        });
                      }}
                      settings={[]}
                    />
                  </div>
                </Popover>
              )}

              {item.url && (
                <div style={{ marginTop: "8px" }}>
                  <strong>
                    {__("Current link:", "three-col-post-categories")}
                  </strong>{" "}
                  {item.url}
                </div>
              )}
            </div>
          </PanelBody>
        ))}
      </InspectorControls>

      <div {...blockProps}>
        <div className="three-col-post-categories__grid">
          {items.map((item, index) => (
            <div key={index} className="three-col-post-categories__item">
              {item.backgroundUrl ? (
                <div
                  className="three-col-post-categories__image"
                  style={{ backgroundImage: `url(${item.backgroundUrl})` }}
                ></div>
              ) : (
                <div className="three-col-post-categories__image three-col-post-categories__image--placeholder"></div>
              )}
              <div className="three-col-post-categories__content">
                <h2 className="three-col-post-categories__title">
                  {item.title ||
                    __(`Item ${index + 1}`, "three-col-post-categories")}
                </h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
