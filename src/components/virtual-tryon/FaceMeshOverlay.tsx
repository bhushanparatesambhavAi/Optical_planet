"use client"

import React, { useEffect, useRef, useState, useImperativeHandle, forwardRef } from "react"
// import Webcam from "react-webcam" 
// I'll use native video element to avoid dependency if not in plan, but plan checks package.json.
// package.json doesn't have react-webcam. I will use native <video>.
import { Camera, RefreshCw, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/Button"
// import { FaceMesh } from "@mediapipe/face_mesh" // Logic skeleton
// import { Camera as CameraUtils } from "@mediapipe/camera_utils"

interface FaceMeshOverlayProps {
    selectedFrame: any
    onCapture?: (imageSrc: string) => void
}

export const FaceMeshOverlay = forwardRef<{ capture: () => string | null }, FaceMeshOverlayProps>(
    ({ selectedFrame, onCapture }, ref) => {
        const videoRef = useRef<HTMLVideoElement>(null)
        const canvasRef = useRef<HTMLCanvasElement>(null)
        const [permissionGranted, setPermissionGranted] = useState(false)
        const [isLoading, setIsLoading] = useState(true)
        const [error, setError] = useState<string | null>(null)

        useImperativeHandle(ref, () => ({
            capture: () => {
                if (videoRef.current && canvasRef.current) {
                    const video = videoRef.current
                    const canvas = canvasRef.current
                    const ctx = canvas.getContext('2d')
                    if (ctx) {
                        canvas.width = video.videoWidth
                        canvas.height = video.videoHeight

                        // Draw video first
                        // Need to save context to flip if needed, but video is flipped in CSS.
                        // For capture we want WYSIWYG, so we should flip it on canvas too if CSS flips it.
                        // css scale-x-[-1] flips it.

                        ctx.save()
                        ctx.scale(-1, 1)
                        ctx.drawImage(video, -canvas.width, 0, canvas.width, canvas.height)
                        ctx.restore()

                        // Draw overlay (mock)
                        if (selectedFrame) {
                            ctx.font = "30px Arial"
                            ctx.fillStyle = "white"
                            ctx.fillText(`Tried on: ${selectedFrame.name}`, 50, 50)

                            // Simulate glasses overlay
                            // ctx.drawImage(glassesImage, ...)
                        }

                        const imageSrc = canvas.toDataURL("image/png")
                        if (onCapture) onCapture(imageSrc)
                        return imageSrc
                    }
                }
                return null
            }
        }))

        useEffect(() => {
            startCamera()
            return () => {
                stopCamera()
            }
        }, [])

        const startCamera = async () => {
            setIsLoading(true)
            setError(null)
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: { facingMode: "user", width: 640, height: 480 }
                })
                if (videoRef.current) {
                    videoRef.current.srcObject = stream
                    setPermissionGranted(true)
                }
            } catch (err) {
                console.error("Error accessing webcam:", err)
                setError("Camera access denied or unavailable. Please check permissions.")
                setPermissionGranted(false)
            } finally {
                setIsLoading(false)
            }
        }

        const stopCamera = () => {
            if (videoRef.current && videoRef.current.srcObject) {
                const stream = videoRef.current.srcObject as MediaStream
                stream.getTracks().forEach(track => track.stop())
                videoRef.current.srcObject = null
            }
        }

        // Placeholder for MediaPipe logic
        useEffect(() => {
            if (!permissionGranted || !videoRef.current || !canvasRef.current) return
            console.log("FaceMesh active for frame:", selectedFrame?.name)
        }, [permissionGranted, selectedFrame])

        return (
            <div className="relative w-full h-full bg-black flex items-center justify-center overflow-hidden rounded-md sm:rounded-2xl">
                {/* Video Feed */}
                <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="absolute inset-0 w-full h-full object-cover transform scale-x-[-1]" // Mirror effect
                    onLoadedMetadata={() => setIsLoading(false)}
                />

                {/* AR Overlay Canvas */}
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full object-cover pointer-events-none transform scale-x-[-1]"
                    style={{ display: 'none' }} // Hidden canvas for capture processing
                />

                {/* Real-time AR Overlay Canvas (Visible) */}
                {/* Note: I'm reusing the same canvas ref for logic simplicity in mock, 
           but in real app we might want separate layers or WebGL canvas.
           For now, the hidden capture canvas approach is fine, but visually we need to see the "Glasses".
           Since I am not drawing real glasses yet, I will just leave the video.
           If I were drawing, I'd use a visible canvas overlay.
       */}

                {/* UI States */}
                {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
                        <RefreshCw className="w-10 h-10 text-white animate-spin" />
                    </div>
                )}

                {error && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900 z-20 text-white p-6 text-center">
                        <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
                        <h3 className="text-xl font-bold mb-2">Camera Error</h3>
                        <p className="mb-6 max-w-xs">{error}</p>
                        <Button onClick={startCamera}>Try Again</Button>
                    </div>
                )}

                {!permissionGranted && !isLoading && !error && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900 z-20 text-white p-6 text-center">
                        <Camera className="w-12 h-12 text-primary-500 mb-4" />
                        <h3 className="text-xl font-bold mb-2">Enable Camera</h3>
                        <p className="mb-6 max-w-xs">Allow access to your camera to try on frames virtually.</p>
                        <Button onClick={startCamera}>Allow Camera</Button>
                    </div>
                )}
            </div>
        )
    })
FaceMeshOverlay.displayName = "FaceMeshOverlay"
