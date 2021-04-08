import { get } from 'lodash';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { MAX_IMAGE_SIZE } from '../../Utilities/constants';
import {
  generateFileObject,
  toBase64,
  validateSize,
} from '../../Utilities/fileUtils';
import './ImageUploader.scss';
const pixelRatio = 4;

function ImageUploader(props) {
  const {
    label,
    className,
    onError,
    onChange,
    aspect,
    defaultImage,
    defaultDisplayImage,
  } = props;
  const [blob, setBlob] = useState(null);
  const [isCropperActive, setCropperActive] = useState(false);
  const [crop, setCrop] = useState({
    unit: '%',
    width: 30,
    aspect: aspect || 16 / 9,
  });
  const [croppedImg, setCroppedImg] = useState(defaultImage || null);
  const imgRef = useRef(null);
  const [completedCrop, setCompletedCrop] = useState(null);
  const { t } = useTranslation();

  const onLoad = useCallback((img) => {
    imgRef.current = img;
  }, []);

  useEffect(() => {
    if (!completedCrop || !imgRef.current) {
      return;
    }
    const image = imgRef.current;
    const canvas = document.createElement('canvas');
    const crop = completedCrop;
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width * pixelRatio;
    canvas.height = crop.height * pixelRatio;
    const ctx = canvas.getContext('2d');
    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height,
    );

    canvas.toBlob((blob) => {
      toBase64(blob).then((data) => {
        setCroppedImg(data);
      });
    }, 'image/jpeg');
  }, [completedCrop]);

  const handleFiles = (event) => {
    const file = get(event, 'target.files[0]');
    if (!validateSize(file, MAX_IMAGE_SIZE)) {
      if (onError) {
        onError(t('ImageUploader.Error.FileSize'));
      }
    }
    generateFileObject([file]).then((fileObject) => {
      setBlob(fileObject.data);
      setCropperActive(true);
    });
  };
  const handleCropCompletion = () => {
    setCropperActive(false);
    if (croppedImg && onChange) {
      onChange(croppedImg);
    }
  };
  return (
    <div className={`${className || ''} image-uploader-wrapper`}>
      <label className="uploader-label mt-2">{label}</label>
      <div className="image-section">
        {!!blob && isCropperActive && (
          <ReactCrop
            imageStyle={{ width: '100%' }}
            className="cropper"
            src={blob}
            onImageLoaded={onLoad}
            crop={crop}
            onChange={(c) => setCrop(c)}
            onComplete={(c) => setCompletedCrop(c)}
          />
        )}
        {!blob && !croppedImg && (
          <div className="default-display-image">{defaultDisplayImage}</div>
        )}
        {isCropperActive && (
          <button
            className="btn btn-success d-flex justify-content-center align-items-center mt-1"
            onClick={handleCropCompletion}
          >
            <span className="mr-1">{t('ImageUploader.Done')}</span>
            <i className="icon-line-circle-check" />
          </button>
        )}
        {!!croppedImg && !isCropperActive && (
          <img className="uploader-image-preview" alt="" src={croppedImg} />
        )}

        {!isCropperActive && (
          <React.Fragment>
            <label
              htmlFor="image-uploader-file-input"
              className="btn btn-success mt-1 upload-button"
            >
              {t('ImageUploader.UploadFile')}
            </label>
            <input
              id="image-uploader-file-input"
              className="uploader-file-input"
              style={{ visibility: 'hidden' }}
              type="file"
              accept="image/*"
              name="kt_user_add_user_avatar"
              onChange={handleFiles}
            />
          </React.Fragment>
        )}
      </div>
    </div>
  );
}

export default ImageUploader;
